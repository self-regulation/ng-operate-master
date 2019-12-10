import { Component, OnInit } from '@angular/core';
import { ExceptionLogService } from './exception-log.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';

@Component({
    selector: 'exception-log',
    templateUrl: './exception-log.component.html',
    providers: [ExceptionLogService]
})
export class ExceptionLogComponent implements OnInit {
    logForm: FormGroup;
    pageNum: number = 1;
    pageSize: number = 10;
    exceptionLogList: any = [];
    total: number = 0;
    tableLoading: boolean = false;
    pageSizeOptions = [10, 20, 30, 40, 50];
    dateRange: any = [moment().subtract(1, 'day').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
    startTime: any = moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss');
    endTime: any = moment().format('YYYY-MM-DD HH:mm:ss');
    errorType: any = { "0": "Trace", "1": "Debug", "2": "Info", "3": "Warn", "4": "Error", "5": "Fatal" };
    exceptionVisible: boolean = false;
    constructor(private exceptionLogService: ExceptionLogService, private message: NzMessageService, private fb: FormBuilder, private modalService: NzModalService) {

    }
    ngOnInit(): void {
        this.logForm = this.fb.group({
            serverName: [null],
            dateRange: [null]
        });
        this.getCloudGameLog();
    }
    getCloudGameLog() {
        let params = {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            startTime: this.startTime,
            endTime: this.endTime,
            serverName: this.logForm.value.serverName
        };
        this.tableLoading = true;
        this.exceptionLogService.getCloudGameLog(params).subscribe((res: any) => {
            this.tableLoading = false;
            if (res.code == 0) {
                this.exceptionLogList = res.data.list;
                this.total = res.data.total;
            } else {
                this.exceptionLogList = [];
                this.message.create('error', res.message ? res.message : '查询失败!');
            }
        });
    }

    changeDateRange($event) {
        this.startTime = moment($event[0]).format("YYYY-MM-DD HH:mm:ss");
        this.endTime = moment($event[1]).format("YYYY-MM-DD HH:mm:ss");
        this.getCloudGameLog();
    }

    showDetailLog(logDetail) {
        this.modalService.warning({
            nzTitle: '日志内容',
            nzWidth: 900,
            nzContent: logDetail
        });
    }

    changePage(event) {
        this.pageNum = event;
        this.getCloudGameLog();
    }

    changePageSize(event) {
        this.pageSize = event;
        this.getCloudGameLog();
    }

    clear(event: any) {
        if (!event || event.length <= 0) {
            this.startTime = '';
            this.endTime = '';
            this.getCloudGameLog();
        }
    }
}