import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd';
import { areaLine, Line } from '@shared';
import { ProcessMonitorService } from './processMonitor.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'process-monitor',
    templateUrl: './processMonitor.component.html',
    styleUrls: ['../serviceMonitor/serviceMonitor.component.less'],
    providers: [ProcessMonitorService]
})
export class ProcessMonitorComponent implements OnInit {
    processForm: FormGroup;
    pageIndex: number = 1;
    pageSize: number = 10;
    totals: number = 0;
    loading: boolean = false;
    serverName: string = '';
    userName: string = '';
    devDetailRatio: any = {};
    devType: any = '';
    devDetailVisible: boolean = false;
    devDetailLoading: boolean = false;
    processList: any = [];
    bindList: any = [];
    startTime: any = moment().startOf('day').format('YYYY-MM-DD HH:mm');
    endTime: any = moment().format('YYYY-MM-DD HH:mm');
    dateRange: any = [moment().startOf('day').format('YYYY-MM-DD HH:mm'), moment().format('YYYY-MM-DD HH:mm')];
    constructor(private processMonitorService: ProcessMonitorService, private message: NzMessageService, private fb: FormBuilder, private router: Router) {
        this.processForm = this.fb.group({
            taskId: [null],
            serverName: [null],
            userName: [null],
            dateRange: [this.dateRange]
        });
    }
    ngOnInit(): void {
        this.queryAllServersMonitor();
    }
    queryAllServersMonitor() {
        let param = {
            pageNum: this.pageIndex,
            pageSize: this.pageSize,
            taskId: this.processForm.value.taskId,
            serverName: this.processForm.value.serverName,
            userName: this.processForm.value.userName,
            startTime: this.startTime,
            endTime: this.endTime
        }

        this.loading = true;
        this.processMonitorService.queryAllServersMonitor(param).subscribe((res: any) => {
            this.loading = false;
            if (res.code == 0) {
                this.bindList = res.data.list;
                this.processList = [];
                res.data.list.forEach((item: any, index) => {
                    let processItem = {
                        taskId: null,
                        pid: null,
                        ip: null,
                        user: null,
                        gameId: null,
                        name: null,
                        processorTime: [],
                        workingSet: [],
                        lostRate: [],
                        brandwidth: [],
                        fps: [],
                        cfps: [],
                        controlLatency: [],
                        createTime: null
                    };
                    processItem.taskId = item.taskId;
                    if (item.data.length > 0) {
                        processItem.pid = item.data[0].pid;
                        processItem.ip = item.data[0].ip;
                        processItem.user = item.data[0].user;
                        processItem.gameId = item.data[0].gameId;
                        processItem.name = item.data[0].name;
                        processItem.createTime = item.data[0].createTime;

                        processItem.processorTime = areaLine({
                            xDate: item.data.map((res: any) => {
                                return moment.unix(res.createTime).format('YYYY-MM-DD HH:mm');
                            }), seriesData: item.data.map((res: any) => {
                                return res.processorTime;
                            })
                        });

                        processItem.workingSet = areaLine({
                            xDate: item.data.map((res: any) => {
                                return moment.unix(res.createTime).format('YYYY-MM-DD HH:mm');
                            }), seriesData: item.data.map((res: any) => {
                                return res.workingSet;
                            }),
                            unit: "MB"
                        });

                        processItem.lostRate = areaLine({
                            xDate: item.data.map((res: any) => {
                                return moment.unix(res.createTime).format('YYYY-MM-DD HH:mm');
                            }), seriesData: item.data.map((res: any) => {
                                return res.lostRate;
                            })
                        });

                        processItem.brandwidth = areaLine({
                            xDate: item.data.map((res: any) => {
                                return moment.unix(res.createTime).format('YYYY-MM-DD HH:mm');
                            }), seriesData: item.data.map((res: any) => {
                                return res.brandwidth;
                            }),
                            unit: "KB/s"
                        });

                        processItem.fps = areaLine({
                            xDate: item.data.map((res: any) => {
                                return moment.unix(res.createTime).format('YYYY-MM-DD HH:mm');
                            }), seriesData: item.data.map((res: any) => {
                                return res.fps;
                            }),
                            unit: "fps"
                        });

                        processItem.cfps = areaLine({
                            xDate: item.data.map((res: any) => {
                                return moment.unix(res.createTime).format('YYYY-MM-DD HH:mm');
                            }), seriesData: item.data.map((res: any) => {
                                return res.cfps;
                            }),
                            unit: "fps"
                        });

                        processItem.controlLatency = areaLine({
                            xDate: item.data.map((res: any) => {
                                return moment.unix(res.createTime).format('YYYY-MM-DD HH:mm');
                            }), seriesData: item.data.map((res: any) => {
                                return res.controlLatency;
                            }),
                            unit: "ms"
                        });

                    }
                    this.processList.push(processItem);
                    console.log(this.processList);
                });
                this.totals = res.data.total;

            } else {
                this.message.create('error', res.message ? res.message : '查询数据失败!');
            }
        });

    }

    changePage(event) {
        this.pageIndex = event;
        this.queryAllServersMonitor();
    }
    formateLineData(data: any, type: any): any {
        if (!data || data.length <= 0) {
            return;
        }
        let xDate = [], seriesData = [];
        if (type == 'process') {
            data.forEach((item: any) => {
                xDate.push(moment.unix(item.createTime).format('YYYY-MM-DD HH:mm'));
                seriesData.push((item.processorTime).toFixed(2));
            });

        } else if (type == 'workingSet') {
            data.forEach((item: any) => {
                xDate.push(moment.unix(item.createTime).format('YYYY-MM-DD HH:mm'));
                seriesData.push((item.workingSet / 1024).toFixed(2));
            });
        }
        return areaLine({ xDate: xDate, seriesData: seriesData });
    }

    showDevDetail(data: any, type: any) {
        if (!data || data.series[0].data.length == 0) {
            return;
        }
        this.devDetailRatio = {};
        switch (type) {
            case 'processorTime':
                this.devDetailRatio = Line({ xDate: data.xAxis.data, seriesData: data.series[0].data, viewTitle: 'CPU占用率', unit: '(%)', des: '占用率' });
                break;
            case 'workingSet':
                this.devDetailRatio = Line({ xDate: data.xAxis.data, seriesData: data.series[0].data, viewTitle: '内存', unit: '(MB)', des: '内存' });
                break;
            case 'lostRate':
                this.devDetailRatio = Line({ xDate: data.xAxis.data, seriesData: data.series[0].data, viewTitle: '丢包率', unit: '(%)', des: '丢包率' });
                break;
            case 'brandwidth':
                this.devDetailRatio = Line({ xDate: data.xAxis.data, seriesData: data.series[0].data, viewTitle: '带宽', unit: '(KB/s)', des: '带宽' });
                break;
            case 'fps':
                this.devDetailRatio = Line({ xDate: data.xAxis.data, seriesData: data.series[0].data, viewTitle: '服务端帧率', unit: '(fps)', des: '服务端帧率' });
                break;
            case 'cfps':
                this.devDetailRatio = Line({ xDate: data.xAxis.data, seriesData: data.series[0].data, viewTitle: '客户端帧率', unit: '(fps)', des: '客户端帧率' });
                break;
            case 'controlLatency':
                this.devDetailRatio = Line({ xDate: data.xAxis.data, seriesData: data.series[0].data, viewTitle: '控制延迟', unit: '(ms)', des: '控制延迟' });
                break;

        }
        this.devDetailVisible = true;
    }


    closeDevDetail(): void {
        this.devDetailVisible = false;
    }

    inquireProcess(): void {
        this.pageIndex = 1;
        this.queryAllServersMonitor();
    }

    //查看服务器
    lookServer(serverName: any) {
        console.log(serverName);
        this.router.navigate(['/monitor/serviceMonitor'], { queryParams: { name: serverName } });
    }

    changeDateRange($event) {
        this.startTime = moment($event[0]).format('YYYY-MM-DD HH:mm');
        this.endTime = moment($event[1]).format('YYYY-MM-DD HH:mm');
        this.dateRange = [this.startTime, this.endTime];
        this.queryAllServersMonitor();
    }

    clear(event: any) {
        if (!event || event.length <= 0) {
            this.startTime = '';
            this.endTime = '';
            this.queryAllServersMonitor();
        }
    }
}