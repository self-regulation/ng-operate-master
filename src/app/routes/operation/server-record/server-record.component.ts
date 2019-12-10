import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServerRecordService } from './server-record.service';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: "server-record",
    templateUrl: "./server-record.component.html",
    providers: [ServerRecordService],
    styleUrls: ['./server-record.component.less']
})
export class ServerRecordComponent implements OnInit {
    serverRecordForm: FormGroup;
    pageNum: number = 1;
    pageSize: number = 10;
    serverRecordList: any = [];
    total: number = 0;
    tableLoading: boolean = false;
    pageSizeOptions = [10, 20, 30, 40, 50];
    serverName: any = '';
    startTime: any = moment().subtract(7, 'day').format('YYYY-MM-DD');
    endTime: any = moment().format('YYYY-MM-DD');
    dateRange: any = [moment().subtract(7, 'day').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
    curOperateType: any = { 'request': '用户请求开始', 'log': '游戏服务器返回日志', 'stop': '游戏服务器返回停止命令' };
    ServerResponseVisible: boolean = false;
    responseModalLoading: boolean = false;
    serverResponseList: any = [];
    constructor(private serverRecordService: ServerRecordService, private message: NzMessageService, private route: ActivatedRoute, private fb: FormBuilder) {
        this.route.queryParams.subscribe((res: any) => {
            JSON.stringify(res) != '{}' ? this.serverName = res.name : this.serverName = '';
        });
    }

    ngOnInit(): void {
        this.serverRecordForm = this.fb.group({
            // serverName: [null],
            dateRange: [null]
        });

        this.getServerRecord();
    }

    getServerRecord() {
        let params = {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            serverName: this.serverName,
            startTime: this.startTime,
            endTime: this.endTime
        };
        this.tableLoading = true;
        this.serverRecordService.getServerRecord(params).subscribe((res: any) => {
            console.log(res);
            this.tableLoading = false;
            if (res.code == 0) {
                this.serverRecordList = res.data.list;
                this.total = res.data.total;
            } else {
                this.message.create('error', res.message ? res.message : '查询失败!');
            }
        });
    }
    //服务器返回的操作详情
    // getServerResponse() {

    // }

    lookResposeDetail(tid: any) {
        this.ServerResponseVisible = true;
        let params = {
            tId: tid
        };
        this.responseModalLoading = true;
        this.serverResponseList = [];
        this.serverRecordService.getServerResponse(params).subscribe((res: any) => {
            this.responseModalLoading = false;
            console.log(res);
            if (res.code == 0) {
                this.serverResponseList = res.data;
            } else {
                this.message.create('error', res.message ? res.message : '查询失败!');
            }
        });
    }

    changeDateRange($event) {
        this.startTime = moment($event[0]).format('YYYY-MM-DD HH:mm');
        this.endTime = moment($event[1]).format('YYYY-MM-DD HH:mm');
        this.dateRange = [this.startTime, this.endTime];
        this.getServerRecord();
    }

    changePage(event) {
        this.pageNum = event;
        this.getServerRecord();
    }

    changePageSize(event) {
        this.pageSize = event;
        this.getServerRecord();
    }

    serverResponseCancel() {
        this.ServerResponseVisible = false;
    }

    formateHeader(time, type) {
        return moment(time).format('YYYY-MM-DD HH:mm') + '      ' + this.curOperateType[type];
    }

    clear(event: any) {
        if (!event || event.length <= 0) {
            this.startTime = '';
            this.endTime = '';
            this.getServerRecord();
        }
    }
}