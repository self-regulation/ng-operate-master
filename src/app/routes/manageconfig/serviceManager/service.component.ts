import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { ServiceServer } from './service.server';
import { NzMessageService } from 'ng-zorro-antd';
import * as moment from 'moment';
import { Line, barLine, basicLine } from '@shared';

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

    gpuData: any = [];
    constructor(private serviceServer: ServiceServer, private message: NzMessageService) {
    }
    ngOnInit(): void {
        this.initAllRegionData();
    }
    //初始化服务器组数据
    initAllRegionData() {
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
            this.dev = dev;
            this.serviceName = serviceName;
            this.gpuVisible = true;
            params['gpuId'] = dev.split(':')[1];
            this.queryGpuDatas(params);
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
                ratioSeries.push((item.percent).toFixed(2));
            });
            viewTitle = 'CPU';
        } else if (dev === 'Memory') {
            viewData.forEach((item: any) => {
                xDate.push(moment.unix(item.createTime).format('YYYY-MM-DD HH:mm'));
                ratioSeries.push((((item.mtotal - item.mfree) / item.mtotal) * 100).toFixed(2));
                dataSeries.push(((item.mtotal - item.mfree) / 1024).toFixed(2));
            });
            viewTitle = 'CPU';
            this.dataList = Line({ xDate: xDate, seriesData: dataSeries, viewTitle: viewTitle + "-可用空间大小", unit: '(G)', des: '可用空间' });
        } else {
            viewData[dev].forEach((item: any) => {
                xDate.push(moment.unix(item.createTime).format('YYYY-MM-DD HH:mm'));
                ratioSeries.push(((item.free / item.size) * 100).toFixed(2));
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
        this.queryGameServerByRegion((region.name).split(":")[1]);
    }

    //查询服务组下的服务器信息
    queryGameServerByRegion(regionId) {
        this.expandLoading = true;
        this.totals = 0;
        this.serviceList = [];
        this.serviceServer.queryGameServerByRegion({
            region: regionId,
            pageNum: this.pageNum,
            pageSize: this.pageSize
        }).subscribe((res: any) => {
            this.expandLoading = false;
            if (res.code == 0) {
                this.totals = res.data.total;
                this.serviceList = res.data.list;
                this.serviceList.forEach((service: any, sIndex) => {
                    this.serviceList[sIndex].devExpand = false;
                });
            } else {
                this.message.create('error', res.message ? res.message : '查询数据失败!');
            }
        });
    }
    changePage($event?: any, region?: any) {
        this.pageNum = $event;
        this.queryGameServerByRegion((region.name).split(":")[1]);
    }

    queryGpuDatas(params) {
        this.gpuLoading = true;
        this.serviceServer.queryGpuDatas(params).subscribe((res: any) => {
            this.gpuData = [];
            this.gpuLoading = false;
            if (res.code == 0 && JSON.stringify(res.data) != '{}') {
                for (let gpuItem in res.data) {
                    let xDate = [],
                        gpuTempList = [],//核心温度
                        gpuSmList = [],//流处理器的利用率 %
                        gpuMemList = [],//显存利用率 %
                        gpuEncList = [],//编码器利用率 %
                        gpuDecList = [],//解码器利用率 %

                        gpuMclkList = [],//显存频率 MHz
                        gpuPclkList = [];//GPU频率 MHz
                    let echartData = {
                        usageRate: null,
                        temperat: null
                    };
                    let gpuSmSeries = null, gpuMemSeries = null, gpuEncSeries = null, gpuDecSeries = null, gpuMclkSeries = null, gpuPclkSeries = null, gpuName = null, seriesData = [];
                    res.data[gpuItem].forEach((item: any) => {
                        xDate.push(moment.unix(item.createTime).format('YYYY-MM-DD HH:mm'));
                        gpuTempList.push(item.gpuTemp);

                        gpuSmList.push(item.gpuSm);
                        gpuMemList.push(item.gpuMem);
                        gpuEncList.push(item.gpuEnc);
                        gpuDecList.push(item.gpuDec);

                        gpuMclkList.push(item.gpuMclk);
                        gpuPclkList.push(item.gpuPclk);
                        gpuName = item.gpuName;
                    });
                    gpuSmSeries = {
                        name: '流处理器的利用率',
                        type: 'line',
                        data: gpuSmList
                    };

                    gpuMemSeries = {
                        name: '显存利用率',
                        type: 'line',
                        data: gpuMemList
                    };

                    gpuEncSeries = {
                        name: '编码器利用率',
                        type: 'line',
                        data: gpuMemList
                    }

                    gpuDecSeries = {
                        name: '解码器利用率',
                        type: 'line',
                        data: gpuDecList
                    }

                    gpuMclkSeries = {
                        name: '显存频率',
                        type: 'bar',
                        yAxisIndex: 1,
                        data: gpuMclkList
                    }

                    gpuPclkSeries = {
                        name: 'GPU频率',
                        type: 'bar',
                        yAxisIndex: 1,
                        data: gpuPclkList
                    }
                    let params = {
                        title: gpuName,
                        xData: xDate,
                        seriesData: [gpuSmSeries, gpuMemSeries, gpuEncSeries, gpuDecSeries, gpuMclkSeries, gpuPclkSeries],
                        legend: ['流处理器的利用率', '显存利用率', '编码器利用率', '解码器利用率', '显存频率', 'GPU频率'],
                        y1AxisName: '利用率',
                        y1unit: '%',
                        y2AxisName: '频率',
                        y2unit: 'MHz',
                        y1max: Math.ceil(Math.max(...[...gpuSmList, ...gpuMemList, ...gpuEncList, ...gpuDecList]) / 9.5) * 10,
                        y1min: Math.floor(Math.min(...[...gpuSmList, ...gpuMemList, ...gpuEncList, ...gpuDecList]) / 10) * 10,
                        y2max: Math.ceil(Math.max(...[...gpuMclkList, ...gpuPclkList]) / 9.5) * 10,
                        y2min: Math.floor(Math.min(...[...gpuMclkList, ...gpuPclkList]) / 10) * 10
                    };
                    echartData.usageRate = barLine(params);
                    echartData.temperat = basicLine(
                        {
                            name: 'GPU温度',
                            type: 'line',
                            data: gpuTempList
                        },
                        xDate,
                        ['GPU温度'],
                        '℃',
                        gpuName,
                        Math.floor(Math.min(...[...gpuTempList]) / 10) * 10,
                        Math.ceil(Math.max(...[...gpuTempList]) / 9.5) * 10

                    );
                    this.gpuData.push(echartData);
                }
            } else {
                if (res.code == 0) {
                    this.message.create('warning', res.message ? res.message : '暂无数据');
                } else {
                    this.message.create('error', res.message ? res.message : '查询失败');
                }

            }
            this.gpuVisible = true;
        });
    }


}