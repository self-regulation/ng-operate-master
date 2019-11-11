import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { ServiceServer } from './service.server';
import { NzMessageService } from 'ng-zorro-antd';
import * as moment from 'moment';
import { Line } from '@shared';

@Component({
    selector: 'service-monitor',
    templateUrl: './service.component.html',
    styleUrls: ['./service.component.less'],
    providers: [ServiceServer]
})
export class ServiceComponent implements OnInit {
    serviceVisible: boolean = false;
    serviceList: any = [];
    bindList: any = [];
    ratioList: any = null;  //可视化数据 使用率
    dataList: any = null; //可视化数据 使用数量
    unit: any = 'hour';
    dev: any = '';
    serviceName: any = '';
    gpuVisible: boolean = false; //gpu显示
    gpuLoading: boolean = false;
    gpuVideoEngineList: any = null; //视频引擎占用率
    gpuMemoryControllerList: any = null;//GPU内存控制器占用率
    gpuCoreList: any = null; //GPU核心渲染占用率
    gpuTemperatureList: any = null;//GPU温度
    gpuName: any = '';
    tableLoading: any = false;

    allRegions: any = [];
    pageNum: any = 1;
    pageSize: any = 10;
    expandLoading: boolean = false;
    totals: any = 0;
    pageSizeOptions = [10, 20, 30, 40, 50];
    constructor(private serviceServer: ServiceServer, private message: NzMessageService) {
    }
    ngOnInit(): void {
        // this.queryAllServers();
        this.initAllRegionData();
    }
    //初始化服务器组数据
    initAllRegionData() {
        // forkJoin([this.serviceServer.queryAllRegion()])queryGameServerByRegion
        this.serviceServer.queryAllRegion().subscribe((result: any) => {
            if (result.code == 0) {
                this.bindList = result.data;
                result.data.forEach((region: any, index) => {
                    let item = {
                        groupExpand: index == 0 ? true : false,
                        name: region
                    };
                    this.allRegions.push(item);
                });
                if (result.data && result.data.length > 0) {
                    this.serviceList = [];
                    this.queryGameServerByRegion((result.data[0]).split(":")[1]);
                }
            } else {
                this.message.create('error', result.message ? result.message : '查询数据失败!');
            }
        });
    }

    //查询所有服务器
    // queryAllServers() {
    //     this.tableLoading = true;
    //     this.serviceServer.queryAllServers().subscribe((res: any) => {
    //         this.tableLoading = false;
    //         if (res.code == 0) {
    //             let index = 0;
    //             if (JSON.stringify(res.data) != '{}') {
    //                 this.bindList = [res.data];
    //             } else {
    //                 this.bindList = [];
    //             }
    //             for (let service in res.data) {
    //                 let serviceGroup = {
    //                     name: service,
    //                     list: res.data[service],
    //                     groupExpand: true
    //                 };
    //                 if (index == 0) {
    //                     serviceGroup.groupExpand = true;
    //                 } else {
    //                     serviceGroup.groupExpand = false;
    //                 }
    //                 res.data[service].forEach((ser: any, sIndex) => {
    //                     res.data[service][sIndex].devExpand = false;
    //                 });
    //                 index++;
    //                 this.serviceList.push(serviceGroup);
    //             }
    //         } else {
    //             this.serviceList = [];
    //             this.message.create('error', res.message ? res.message : '查询数据失败!');
    //         }
    //         console.log(this.serviceList);
    //     });
    // }

    //查询服务器设备信息
    queryDevDatas(dev: string, serviceName, startTime?: any, endTime?: any) {
        if (!serviceName) {
            this.message.create('error', '服务器名称不能为空!');
            return;
        }
        if (!startTime) {
            startTime = moment().subtract(1, 'hours').format('YYYY-MM-DD HH:mm:ss');
        }
        if (!endTime) {
            endTime = moment().format('YYYY-MM-DD HH:mm:ss');
        }
        let params = {
            serverName: serviceName,
            startTime: startTime,
            endTime: endTime,
        }
        if (dev == 'CPU') {
            this.serviceServer.queryCpuDatas(params).subscribe((res: any) => {
                if (res.code == 0) {
                    if (JSON.stringify(res.data) == '{}' || !res.data || res.data.length <= 0) {
                        this.message.create('warning', '暂无该设备信息数据!');
                        return;
                    }
                    this.reduceViewData(res.data, serviceName, 'CPU');
                    this.dev = dev;
                    this.serviceName = serviceName;
                    this.open();
                } else {
                    this.message.create('error', res.message ? res.message : '查询数据失败!');
                }
            });
        } else if (dev == 'Memory') {
            this.serviceServer.queryMemoryDatas(params).subscribe((res: any) => {
                console.log(res);
                if (res.code == 0) {
                    if (JSON.stringify(res.data) == '{}' || !res.data || res.data.length <= 0) {
                        this.message.create('warning', '暂无该设备信息数据!');
                        return;
                    }
                    this.reduceViewData(res.data, serviceName, 'Memory');
                    this.dev = dev;
                    this.serviceName = serviceName;
                    this.open();
                } else {
                    this.message.create('error', res.message ? res.message : '查询数据失败!');
                }
            });
        } else if (dev.substr(0, 3) == 'GPU') {
            params['gpuId'] = dev;
            this.serviceServer.queryGpuDatas(params).subscribe((res: any) => {
                console.log(res);
                if (res.code == 0) {
                    if (JSON.stringify(res.data) == '{}' || !res.data || res.data.length <= 0) {
                        this.message.create('warning', '暂无该设备信息数据!');
                        return;
                    }
                    this.reduceViewData(res.data, serviceName, dev);
                    this.dev = dev;
                    this.serviceName = serviceName;
                    this.gpuVisible = true;
                } else {
                    this.message.create('error', res.message ? res.message : '查询数据失败!');
                }
            });
        } else {//硬盘
            params['diskName'] = dev;
            this.serviceServer.queryDiskDatas(params).subscribe((res: any) => {
                console.log(res);
                if (res.code == 0) {
                    if (JSON.stringify(res.data) == '{}' || !res.data || res.data.length <= 0) {
                        this.message.create('warning', '暂无该设备信息数据!');
                        return;
                    }

                    this.reduceViewData(res.data, serviceName, dev);
                    this.dev = dev;
                    this.serviceName = serviceName;
                    this.open();
                } else {
                    this.message.create('error', res.message ? res.message : '查询数据失败!');
                }
            });
        }
    }

    reduceViewData(viewData: any, serviceName, dev) {
        let xDate = [];
        let ratioSeries = [];
        let dataSeries = [];
        let viewTitle = '';
        this.gpuLoading = false;
        if (dev === 'CPU') {
            viewData.forEach((item: any) => {
                xDate.push(moment.unix(item.createTime).format('YYYY-MM-DD HH:mm'));
                ratioSeries.push((item.percent / 100).toFixed(2));
            });
            viewTitle = 'CPU';
        } else if (dev === 'Memory') {
            viewData.forEach((item: any) => {
                xDate.push(moment.unix(item.createTime).format('YYYY-MM-DD HH:mm'));
                ratioSeries.push((((item.mtotal - item.mfree) / item.mtotal) / 100).toFixed(2));
                dataSeries.push(((item.mtotal - item.mfree) / 1024).toFixed(2));
            });
            viewTitle = 'CPU';
            this.dataList = Line({ xDate: xDate, seriesData: dataSeries, viewTitle: viewTitle + "-可用空间大小", unit: '(G)', des: '可用空间' });
        } else if (dev.substr(0, 3) == 'GPU') {
            let videoEngineSeries = [],
                gpuMemoryControllerListSeries = [], gpuCoreSeries = [], gpuTemperatureSeries = [];
            viewData[dev].forEach((item: any) => {
                xDate.push(moment.unix(item.createTime).format('YYYY-MM-DD HH:mm'));
                ratioSeries.push(((parseFloat(item.gpuMemoryUsed) / parseFloat(item.gpuMemoryTotal)) / 100).toFixed(2));
                dataSeries.push(((parseFloat(item.gpuMemoryTotal) - parseFloat(item.gpuMemoryUsed)) / 1024).toFixed(2));
            });
            viewTitle = dev;
            this.gpuName = viewData[dev][0].gpuName;
            videoEngineSeries = viewData[dev].map((item: any) => {
                return parseFloat(item.gpuVideoEngine).toFixed(2);
            });
            gpuMemoryControllerListSeries = viewData[dev].map((item: any) => {
                return parseFloat(item.gpuMemoryController).toFixed(2);
            });
            gpuCoreSeries = viewData[dev].map((item: any) => {
                return parseFloat(item.gpuCore).toFixed(2);
            });

            gpuTemperatureSeries = viewData[dev].map((item: any) => {
                return parseFloat(item.temp).toFixed(2);
            });
            this.gpuVideoEngineList = Line({ xDate: xDate, seriesData: videoEngineSeries, viewTitle: viewTitle + '视频引擎占用率', unit: '(%)', des: '占用率' });
            this.gpuMemoryControllerList = Line({ xDate: xDate, seriesData: gpuMemoryControllerListSeries, viewTitle: viewTitle + '内存控制器占用率', unit: '(%)', des: '占用率' });
            this.gpuCoreList = Line({ xDate: xDate, seriesData: gpuCoreSeries, viewTitle: viewTitle + '使用率', unit: '(%)', des: '使用率' });
            this.gpuTemperatureList = Line({ xDate: xDate, seriesData: gpuTemperatureSeries, viewTitle: viewTitle + '温度', unit: '(℃)', des: '温度' });
            this.ratioList = Line({ xDate: xDate, seriesData: ratioSeries, viewTitle: viewTitle + "内存使用情况", unit: '(%)', des: '使用率' });
            this.dataList = Line({ xDate: xDate, seriesData: dataSeries, viewTitle: viewTitle + "-可用空间大小", unit: '(G)', des: '可用空间' });
            return;
        } else {
            viewData[dev].forEach((item: any) => {
                xDate.push(moment.unix(item.createTime).format('YYYY-MM-DD HH:mm'));
                ratioSeries.push(((item.free / item.size) / 100).toFixed(2));
                dataSeries.push(((item.size - item.free) / 1024).toFixed(2));
            });
            viewTitle = dev + '磁盘';
            this.dataList = Line({ xDate: xDate, seriesData: dataSeries, viewTitle: viewTitle + "-可用空间大小", unit: '(G)', des: '可用空间' });
        }
        this.ratioList = Line({ xDate: xDate, seriesData: ratioSeries, viewTitle: viewTitle + "-使用率", unit: '(%)', des: '使用率' });
    }

    changeUnit(event) {
        this.gpuLoading = true;
        switch (event) {
            case 'hour':
                this.queryDevDatas(this.dev, this.serviceName, moment().subtract(1, 'hours').format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss'));
                break;
            case 'day':
                this.queryDevDatas(this.dev, this.serviceName, moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss'));
                break;
            case 'week':
                this.queryDevDatas(this.dev, this.serviceName, moment().subtract(1, 'weeks').format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss'));
                break;
            default:
                break;
        }
    }


    open(): void {
        this.serviceVisible = true;
    }

    close(): void {
        this.serviceVisible = false;
        this.gpuVisible = false;
        this.unit = 'hour';
        this.gpuName = '';
    }

    collapseRegion(region, $event): void {
        this.pageNum = 1;
        this.allRegions.forEach((item: any, index) => {
            if (region.name == item.name && $event == true) {
                this.allRegions[index].groupExpand = true;
            } else {
                this.allRegions[index].groupExpand = false;
            }
        });
        this.serviceList = [];
        this.queryGameServerByRegion((region.name).split(":")[1]);
    }

    //查询服务组下的服务器信息
    queryGameServerByRegion(regionId) {

        this.expandLoading = true;
        this.totals = 0;
        this.serviceServer.queryGameServerByRegion({
            region: regionId,
            pageNum: this.pageNum,
            pageSize: this.pageSize
        }).subscribe((res: any) => {
            this.expandLoading = false;
            if (res.code == 0) {
                this.totals = res.data.total;
                console.log(this.totals);
                this.serviceList = this.serviceList.concat(res.data.list);
                // this.serviceList = res.data.list;
                this.serviceList.forEach((service: any, sIndex) => {
                    this.serviceList[sIndex].devExpand = false;
                });
            } else {
                this.message.create('error', res.message ? res.message : '查询数据失败!');
            }
        });
    }

    loadMoreService(region) {
        this.pageNum++;
        this.queryGameServerByRegion((region.name).split(":")[1]);
    }

    CollapseService(region) {
        this.pageNum = 1;
        this.serviceList = [];
        this.queryGameServerByRegion((region.name).split(":")[1]);
    }

}