import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd';
import { areaLine, Line, barLine, basicLine } from '@shared';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceServer } from '../service.server';

@Component({
    selector: 'service-monitor',
    templateUrl: './serviceMonitor.component.html',
    styleUrls: ['./serviceMonitor.component.less'],
    providers: [ServiceServer]
})
export class ServiceMonitorComponent implements OnInit {
    serverForm: FormGroup;
    pageIndex: number = 1;
    pageSize: number = 10;
    total: number = 0;
    serverList: any = [];
    bindDataList: any = [];
    loading: boolean = true;

    diskVisible: boolean = false;

    diskUseData: any = null;
    diskAvailableData: any = null;

    unit: any = 'hour';
    serverName: any = '';
    diskLoading: boolean = true;

    gpuVisible: boolean = false;
    gpuLoading: boolean = false;

    gpuData: any = [];
    gpuCoreList: any = [];

    devDetailVisible: boolean = false;
    devDetailRatio: any;
    devDetailData: any;
    devType: any;
    devDetailLoading: boolean = false;
    constructor(private serviceServer: ServiceServer, private message: NzMessageService, private fb: FormBuilder, private route: ActivatedRoute) {

        this.route.queryParams.subscribe((res: any) => {
            if (JSON.stringify(res) != '{}') {
                this.serverForm = this.fb.group({
                    serverName: res.name,
                    status: [null]
                });
            } else {
                this.serverForm = this.fb.group({
                    serverName: [null],
                    status: [null]
                });
            }
        });

    }
    ngOnInit(): void {
        this.queryAllServersMonitor();
    }
    inquireServer() {
        this.pageIndex = 1;
        this.queryAllServersMonitor();
    }
    queryAllServersMonitor() {
        let params = {
            pageNum: this.pageIndex,
            pageSize: this.pageSize
        }
        if (this.serverForm.value.serverName) {
            params["serverName"] = this.serverForm.value.serverName;
        }
        if (this.serverForm.value.status) {
            params["status"] = this.serverForm.value.status;
        }
        this.serverList = [];
        this.loading = true;
        this.serviceServer.queryAllServersMonitor(params).subscribe((res: any) => {
            this.loading = false;
            if (res.code == 0) {
                this.total = res.data.total;
                if (JSON.stringify(res.data) != '{}' && res.data && res.data.list) {
                    let resList: any = res.data.list;
                    this.bindDataList = resList.length > 0 ? resList : [];
                    resList.forEach((item: any) => {
                        let serverItem = {
                            cpu: [],
                            memory: [],
                            gpu: {},
                            disk: {}
                        }
                        serverItem["serverName"] = item.gameServerData.serverName;
                        serverItem["status"] = item.gameServerData.status;
                        serverItem["regionId"] = item.gameServerData.regionId;
                        if (item.serverMonitorDataList && item.serverMonitorDataList.length > 0) {
                            let serverMonitorDataList: any = item.serverMonitorDataList;
                            serverMonitorDataList.forEach((server: any) => {

                                serverItem.cpu.push({
                                    cpercent: server.cpercent,
                                    ccount: server.ccount,
                                    createTime: server.createTime
                                });
                                serverItem.memory.push({
                                    mfree: server.mfree,
                                    mtotal: server.mtotal,
                                    createTime: server.createTime
                                });

                                let serverDisk = JSON.parse(server.disk);
                                serverDisk.forEach((disk: any) => {
                                    if (!serverItem.disk[disk.name]) {
                                        serverItem.disk[disk.name] = [];
                                        serverItem.disk[disk.name].push({
                                            createTime: server.createTime,
                                            free: disk.free,
                                            size: disk.size
                                        });
                                    } else {
                                        serverItem.disk[disk.name].push({
                                            createTime: server.createTime,
                                            free: disk.free,
                                            size: disk.size
                                        });
                                    }

                                });

                                let serverGpu = JSON.parse(server.gpu);
                                serverGpu.forEach((gpu: any) => {
                                    if (!serverItem.gpu[gpu.gpuId]) {
                                        serverItem.gpu[gpu.gpuId] = [];
                                        serverItem.gpu[gpu.gpuId].push({
                                            createTime: server.createTime,
                                            gpuCore: gpu.gpuCore,
                                            gpuDeviceId: gpu.gpuDeviceId,
                                            gpuId: gpu.gpuId,
                                            gpuMemory: gpu.gpuMemory,
                                            gpuMemoryController: gpu.gpuMemoryController,
                                            gpuMemoryTotal: gpu.gpuMemoryTotal,
                                            gpuMemoryUsed: gpu.gpuMemoryUsed,
                                            gpuName: gpu.gpuName,
                                            gpuVideoEngine: gpu.gpuVideoEngine,
                                            temp: gpu.temp
                                        });
                                    } else {
                                        serverItem.gpu[gpu.gpuId].push({
                                            createTime: server.createTime,
                                            gpuCore: gpu.gpuCore,
                                            gpuDeviceId: gpu.gpuDeviceId,
                                            gpuId: gpu.gpuId,
                                            gpuMemory: gpu.gpuMemory,
                                            gpuMemoryController: gpu.gpuMemoryController,
                                            gpuMemoryTotal: gpu.gpuMemoryTotal,
                                            gpuMemoryUsed: gpu.gpuMemoryUsed,
                                            gpuName: gpu.gpuName,
                                            gpuVideoEngine: gpu.gpuVideoEngine,
                                            temp: gpu.temp
                                        });
                                    }
                                });
                            });

                            // if (serverItem.cpu.length > 0) {
                            //     serverItem.cpuInfo = areaLine({
                            //         xDate: (serverItem.cpu).map((item: any) => {
                            //             return moment.unix(item.createTime).format('YYYY-MM-DD HH:mm');
                            //         }), seriesData: (serverItem.cpu).map((item: any) => {
                            //             return (item.cpercent).toFixed(2);
                            //         })
                            //     });
                            // } else {
                            //     serverItem.cpuInfo = null;
                            // }

                            // if (serverItem.memory.length > 0) {
                            //     serverItem.memoryInfo = areaLine({
                            //         xDate: (serverItem.memory).map((item: any) => {
                            //             return moment.unix(item.createTime).format('YYYY-MM-DD HH:mm');
                            //         }), seriesData: (serverItem.memory).map((item: any) => {
                            //             return (((item.mtotal - item.mfree) / item.mtotal) * 100).toFixed(2);
                            //         })
                            //     });
                            // } else {
                            //     serverItem.memoryInfo = null;
                            // }
                        }
                        this.serverList.push(serverItem);
                    });
                }

            } else {
                this.message.create('error', res.message ? res.message : '查询数据失败!');
            }
        });
    }

    formateLineData(data: any, type: any): any {
        if (!data || data.length <= 0) {
            return;
        }
        let xDate = [], seriesData = [];
        if (type == 'cpu') {
            data.forEach((item: any) => {
                xDate.push(moment.unix(item.createTime).format('YYYY-MM-DD HH:mm'));
                seriesData.push((item.cpercent).toFixed(2));
            });

        } else if (type == 'memory') {
            data.forEach((item: any) => {
                xDate.push(moment.unix(item.createTime).format('YYYY-MM-DD HH:mm'));
                seriesData.push((((item.mtotal - item.mfree) / item.mtotal) * 100).toFixed(2));
            });
        }
        return areaLine({ xDate: xDate, seriesData: seriesData });
    }

    lookDetails(type: any, serverName: any) {
        this.serverName = serverName;
        if (type == 'disk') {
            this.diskUseData = null;
            this.diskAvailableData = null;
            this.diskVisible = true;
            let params = {
                serverName: this.serverName,
                startTime: moment().subtract(1, 'hours').format('YYYY-MM-DD HH:mm:ss'),
                endTime: moment().format('YYYY-MM-DD HH:mm:ss')
            }
            this.queryDiskDatas(params);
        } else {
            let params = {
                serverName: serverName,
                startTime: moment().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
                endTime: moment().format('YYYY-MM-DD HH:mm:ss')
            };
            this.queryGpuDatas(params);
        }


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
                        data: gpuEncList
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

    showDevDetail(data: any, type: any, serverName: any) {
        if (!data || data.length <= 0) {
            return;
        }
        console.log(data);
        this.devDetailRatio = {};
        this.devDetailData = {};
        let xDate = [], seriesData = [], remainData = [];
        this.serverName = serverName;
        if (type == 'cpu') {
            this.devType = 'cpu';
            data.forEach((item: any) => {
                xDate.push(moment(item.createTime).format('YYYY-MM-DD HH:mm'));
                seriesData.push((item.cpercent).toFixed(2));
            });
            this.devDetailRatio = Line({ xDate: xDate, seriesData: seriesData, viewTitle: 'CPU使用率', unit: '(%)', des: '使用率' });

        } else if (type == 'memory') {
            this.devType = 'memory';
            data.forEach((item: any) => {
                xDate.push(moment(item.createTime).format('YYYY-MM-DD HH:mm'));
                seriesData.push((((item.mtotal - item.mfree) / item.mtotal) * 100).toFixed(2));
                remainData.push((item.mfree / 1024).toFixed(2));
            });
            this.devDetailRatio = Line({ xDate: xDate, seriesData: seriesData, viewTitle: '内存使用率', unit: '(%)', des: '使用率' });
            this.devDetailData = Line({ xDate: xDate, seriesData: remainData, viewTitle: '内存可用空间大小', unit: '(G)', des: '可用空间' });

        }
        this.devDetailVisible = true;
    }
    //改变详情粒度
    changeDevDetailUnit(event) {
        let params;
        if (event == 'hour') {
            params = {
                serverName: this.serverName,
                startTime: moment().subtract(1, 'hours').format('YYYY-MM-DD HH:mm:ss'),
                endTime: moment().format('YYYY-MM-DD HH:mm:ss')
            }

        } else if (event == 'day') {
            params = {
                serverName: this.serverName,
                startTime: moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
                endTime: moment().format('YYYY-MM-DD HH:mm:ss')
            }
        } else if (event == 'week') {
            params = {
                serverName: this.serverName,
                startTime: moment().subtract(1, 'weeks').format('YYYY-MM-DD HH:mm:ss'),
                endTime: moment().format('YYYY-MM-DD HH:mm:ss')
            }
        }
        this.devDetailRatio = {};
        this.devDetailData = {};
        this.devDetailLoading = true;
        if (this.devType == 'cpu') {
            this.serviceServer.queryCpuDatas(params).subscribe((res: any) => {
                this.devDetailLoading = false;
                let xDate = [], seriesData = [];
                if (res.code == 0) {
                    if (JSON.stringify(res.data) == '{}' || !res.data) {
                        this.message.create('warning', '暂无该设备信息数据!');
                        return;
                    }
                    res.data.forEach((item: any) => {
                        xDate.push(moment.unix(item.createTime).format('YYYY-MM-DD HH:mm'));
                        seriesData.push((item.percent).toFixed(2));
                    });
                    this.devDetailRatio = Line({ xDate: xDate, seriesData: seriesData, viewTitle: 'CPU使用率', unit: '(%)', des: '使用率' });
                } else {
                    this.message.create('error', res.message ? res.message : '暂无该设备信息数据!');
                }
            });
        } else if (this.devType = 'memory') {
            this.serviceServer.queryMemoryDatas(params).subscribe((res: any) => {
                this.devDetailLoading = false;
                let xDate = [], seriesData = [], remainData = [];
                if (res.code == 0) {
                    if (JSON.stringify(res.data) == '{}' || !res.data) {
                        this.message.create('warning', '暂无该设备信息数据!');
                        return;
                    }
                    res.data.forEach((item: any) => {
                        xDate.push(moment.unix(item.createTime).format('YYYY-MM-DD HH:mm'));
                        seriesData.push((((item.mtotal - item.mfree) / item.mtotal) * 100).toFixed(2));
                        remainData.push((item.mfree / 1024).toFixed(2));
                    });
                    this.devDetailRatio = Line({ xDate: xDate, seriesData: seriesData, viewTitle: '内存使用率', unit: '(%)', des: '使用率' });
                    this.devDetailData = Line({ xDate: xDate, seriesData: remainData, viewTitle: '内存可用空间大小', unit: '(G)', des: '可用空间' });
                } else {
                    this.message.create('error', res.message ? res.message : '暂无该设备信息数据!');
                }
            });
        }

    }
    //改变磁盘粒度
    changeDiskUnit(event) {
        let params;
        if (event == 'hour') {
            params = {
                serverName: this.serverName,
                startTime: moment().subtract(1, 'hours').format('YYYY-MM-DD HH:mm:ss'),
                endTime: moment().format('YYYY-MM-DD HH:mm:ss')
            }

        } else if (event == 'day') {
            params = {
                serverName: this.serverName,
                startTime: moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
                endTime: moment().format('YYYY-MM-DD HH:mm:ss')
            }
        } else if (event == 'week') {
            params = {
                serverName: this.serverName,
                startTime: moment().subtract(1, 'weeks').format('YYYY-MM-DD HH:mm:ss'),
                endTime: moment().format('YYYY-MM-DD HH:mm:ss')
            }
        }
        this.diskAvailableData = null;
        this.diskUseData = null;
        this.queryDiskDatas(params);
    }
    queryDiskDatas(params: any) {
        this.diskLoading = true;
        this.serviceServer.queryDiskDatas(params).subscribe((res: any) => {
            this.diskLoading = false;
            if (res.code == 0) {
                if (JSON.stringify(res.data) == '{}' || !res.data) {
                    this.message.create('warning', '暂无数据!');
                    return;
                }
                let useSeriesData = [], xDate = [], legend = [], availableSeriesData = [];
                for (let item in res.data) {
                    let seriesItem = {
                        name: item,
                        type: 'line',
                        data: []
                    };
                    let diskAvailableItem = {
                        name: item,
                        type: 'line',
                        data: []
                    };
                    legend.push(item);
                    xDate = [];
                    res.data[item].forEach((diskItem: any) => {
                        seriesItem.data.push((((diskItem.size - diskItem.free) / diskItem.size) * 100).toFixed(2));
                        xDate.push(moment.unix(diskItem.createTime).format('YYYY-MM-DD HH:mm'));

                        diskAvailableItem.data.push((diskItem.free / 1024).toFixed(2));
                    });
                    useSeriesData.push(seriesItem);
                    availableSeriesData.push(diskAvailableItem);
                }

                this.diskUseData = basicLine(useSeriesData, xDate, legend, '%', '磁盘使用率');
                this.diskAvailableData = basicLine(availableSeriesData, xDate, legend, 'G', '磁盘可用大小');

            } else {
                this.message.create('error', res.message ? res.message : '查询失败!');
            }
        });
    }

    changePage(event) {
        this.pageIndex = event;
        this.queryAllServersMonitor();
    }

    close(): void {
        this.diskVisible = false;
        this.unit = 'hour';
    }

    closeGpu(): void {
        this.gpuVisible = false;
        this.unit = 'hour';
    }

    closeDevDetail(): void {
        this.devDetailVisible = false;
        this.unit = 'hour';
    }

    //改变GPU粒度
    changeGpuUnit(event) {
        let params;
        if (event == 'hour') {
            params = {
                serverName: this.serverName,
                startTime: moment().subtract(1, 'hours').format('YYYY-MM-DD HH:mm:ss'),
                endTime: moment().format('YYYY-MM-DD HH:mm:ss')
            }

        } else if (event == 'day') {
            params = {
                serverName: this.serverName,
                startTime: moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
                endTime: moment().format('YYYY-MM-DD HH:mm:ss')
            }
        } else if (event == 'week') {
            params = {
                serverName: this.serverName,
                startTime: moment().subtract(1, 'weeks').format('YYYY-MM-DD HH:mm:ss'),
                endTime: moment().format('YYYY-MM-DD HH:mm:ss')
            }
        }
        this.queryGpuDatas(params);
    }

}