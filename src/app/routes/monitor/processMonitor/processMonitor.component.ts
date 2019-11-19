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
    unit: string = 'hour';
    devDetailLoading: boolean = false;
    processList: any = [];
    // bindList: any = [];
    constructor(private processMonitorService: ProcessMonitorService, private message: NzMessageService, private fb: FormBuilder, private router: Router) {
        this.processForm = this.fb.group({
            serverName: [null],
            userName: [null]
        });
    }
    ngOnInit(): void {
        this.queryAllServersMonitor();
    }
    queryAllServersMonitor(params?: any) {
        let param = {
            pageNum: this.pageIndex,
            pageSize: this.pageSize
        }
        if (params) {
            param['serverName'] = params.serverName;
            param['userName'] = params.userName;
        }
        this.loading = true;
        this.processMonitorService.queryAllServersMonitor(param).subscribe((res: any) => {
            this.loading = false;
            if (res.code == 0) {
                this.processList = res.data.list;
                this.totals = res.data.total;
            } else {
                this.message.create('error', res.message ? res.message : '查询数据失败!');
            }
        });

    }

    // formatData(processList: any) {
    //     this.processList = [];
    //     processList.forEach((item: any, index) => {
    //         let processItem = {
    //             pid: '',
    //             gameId: '',
    //             name: '',
    //             serverName: '',
    //             processorList: [],
    //             workingSetList: [],
    //             userName: ''
    //         };
    //         if (item && item.processInfoList.length > 0) {
    //             processItem.pid = item.processInfoList[0].pid;
    //             processItem.gameId = item.processInfoList[0].gameId;
    //             processItem.name = item.processInfoList[0].name;
    //             processItem.serverName = item.processInfoList[0].ip;
    //             processItem.processorList = item.processInfoList.filter((process: any) => {
    //                 return process.processorTime;
    //             });

    //             processItem.workingSetList = item.processInfoList.filter((process: any) => {
    //                 return process.workingSet;
    //             });
    //         }
    //         processItem.userName = item.userName;
    //         this.processList[index] = processItem;

    //     });
    // }
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

    showDevDetail(data: any, type: any, serverName: any, userName: any) {
        if (!data || data.length <= 0) {
            return;
        }
        this.devDetailRatio = {};
        let xDate = [], seriesData = [];
        this.serverName = serverName;
        this.userName = userName;
        if (type == 'process') {
            this.devType = 'process';
            data.forEach((item: any) => {
                xDate.push(moment.unix(item.createTime).format('YYYY-MM-DD HH:mm'));
                seriesData.push((item.processorTime).toFixed(2));
            });
            this.devDetailRatio = Line({ xDate: xDate, seriesData: seriesData, viewTitle: 'CPU占用率', unit: '(%)', des: '占用率' });

        } else if (type == 'workingSet') {
            this.devType = 'workingSet';
            data.forEach((item: any) => {
                xDate.push(moment.unix(item.createTime).format('YYYY-MM-DD HH:mm'));
                seriesData.push((item.workingSet / 1024).toFixed(2));
            });
            this.devDetailRatio = Line({ xDate: xDate, seriesData: seriesData, viewTitle: '内存使用情况', unit: '(G)', des: '内存使用' });
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
        this.devDetailLoading = true;
        let xDate = [], seriesData = [];
        this.processMonitorService.queryUsers(params).subscribe((res: any) => {
            this.devDetailLoading = false;

            if (res.code === 0) {
                if (res.data && JSON.stringify(res.data) != '{}') {
                    for (let process in res.data) {
                        if (process == this.userName) {
                            xDate = res.data[process].map((item: any) => {
                                return moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
                            });
                            if (this.devType == 'process') {
                                seriesData = res.data[process].map((item: any) => {
                                    return (item.processorTime / 100).toFixed(2);
                                });
                                this.devDetailRatio = Line({ xDate: xDate, seriesData: seriesData, viewTitle: 'CPU占用率', unit: '(%)', des: '占用率' });
                            } else if (this.devType == 'workingSet') {
                                seriesData = res.data[process].map((item: any) => {
                                    return (item.workingSet / 100).toFixed(2);
                                });
                                this.devDetailRatio = Line({ xDate: xDate, seriesData: seriesData, viewTitle: '磁盘消耗率', unit: '(%)', des: '磁盘消耗率' });
                            }
                        }
                    }
                }

            } else {
                this.message.create('error', res.message ? res.message : '查询数据失败!');
                return;
            }

        });
    }

    closeDevDetail(): void {
        this.devDetailVisible = false;
        this.unit = 'hour';
    }

    inquireProcess(): void {
        this.pageIndex = 1;
        let params = {
            serverName: this.processForm.value.serverName,
            userName: this.processForm.value.userName
        }
        this.queryAllServersMonitor(params);
    }

    //查看服务器
    lookServer(serverName: any) {
        console.log(serverName);
        this.router.navigate(['/monitor/serviceMonitor'], { queryParams: { name: serverName } });
    }
}