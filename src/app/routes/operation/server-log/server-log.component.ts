import { Component, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { ServerLogService } from './server-log.server';

@Component({
    selector: 'server-log',
    templateUrl: './server-log.component.html',
    providers: [ServerLogService]
})
export class ServerlogComponent implements OnInit {
    @ViewChild("titleTemplate", { static: false }) titleTemplate: any;
    logList: any = [];
    logForm: FormGroup;
    pageIndex: any = 1;
    pageSize: any = 10;
    loading = false;
    pageSizeOptions = [10, 20, 30, 40, 50];
    total: any;
    startTime: any = null;
    endTime: any = null;

    constructor(private serverLogService: ServerLogService, private message: NzMessageService, private fb: FormBuilder, ) {
        this.logForm = this.fb.group({
            userName: [null],
            dateRange: [null]
        });
    }
    ngOnInit(): void {
        this.getLogList();

    }
    getLogList() {
        let params = {
            pageNum: this.pageIndex,
            pageSize: this.pageSize,
            userName: this.logForm.value.userName ? this.logForm.value.userName : '',
            startTime: this.startTime ? this.startTime : '',
            endTime: this.endTime ? this.endTime : ''
        };
        this.serverLogService.getLogList(params).subscribe((res: any) => {
            if (res.code == 0) {
                this.logList = res.data.list;
                this.total = res.data.total;
            } else {
                this.message.create('error', res.message ? res.message : '查询失败!');
            }
        });
    }

    rearchLog() {
        this.getLogList();
    }

    onOk(event) {
        this.startTime = moment(event[0]).format("YYYY-MM-DD HH:mm");
        this.endTime = moment(event[1]).format("YYYY-MM-DD HH:mm");
    }
    //下载游戏日志
    downloadGamelog(gameLog) {
        window.open(gameLog, "_blank");
    }

    //下载流端日志
    downloadStreamlog(streamLog) {
        window.open(streamLog, "_blank");
    }

    changePage(event) {
        this.pageIndex = event;
        this.getLogList();
    }

    changePageSize(event) {
        this.pageSize = event;
        this.getLogList();
    }

    clear(event: any) {
        if (!event || event.length <= 0) {
            this.startTime = '';
            this.endTime = '';
        }
    }

}   