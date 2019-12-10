import { Component, OnInit } from '@angular/core';
import { OperateLogService } from './operate-log.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';

@Component({
    selector: 'operate-log',
    templateUrl: './operate-log.component.html',
    providers: [OperateLogService]
})
export class OperatelogComponent implements OnInit {
    logList: any = [];
    logForm: FormGroup;
    pageIndex: any = 1;
    pageSize: any = 10;
    loading = false;
    pageSizeOptions = [10, 20, 30, 40, 50];
    total: any;
    startTime: any = null;
    endTime: any = null;
    constructor(private operateLogService: OperateLogService, private message: NzMessageService, private fb: FormBuilder, ) {

    }
    ngOnInit(): void {
        this.getLogList();
        this.logForm = this.fb.group({
            menu: [null],
            url: [null],
            dateRange: [null]
        });
    }
    getLogList(queryParams?: any) {
        let params = {
            pageNum: this.pageIndex,
            pageSize: this.pageSize,
            title: queryParams ? queryParams.title : '',
            request_uri: queryParams ? queryParams.request_uri : '',
            beginDate: queryParams ? queryParams.beginDate : '',
            endDate: queryParams ? queryParams.endDate : ''
        };
        this.operateLogService.getLogList(params).subscribe((res: any) => {
            if (res.code == 0) {
                this.logList = res.data.list;
                this.total = res.data.total;
            } else {
                this.message.create('error', res.message ? res.message : '查询失败!');
            }
        });
    }

    rearchLog() {
        let queryParams = {
            title: this.logForm.value.menu,
            request_uri: this.logForm.value.url,
            beginDate: this.startTime,
            endDate: this.endTime
        }
        this.getLogList(queryParams);
    }

    onOk(event) {
        this.startTime = moment(event[0]).format("YYYY-MM-DD HH:mm");
        this.endTime = moment(event[1]).format("YYYY-MM-DD HH:mm");
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
            this.getLogList();
        }
    }
}   