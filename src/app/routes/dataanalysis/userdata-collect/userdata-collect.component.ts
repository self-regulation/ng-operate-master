import { Component, OnInit } from '@angular/core';
import { UserdataCollectServer } from './userdata-collect.server';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
@Component({
    selector: "userdata-collect",
    templateUrl: "./userdata-collect.component.html",
    providers: [UserdataCollectServer]
})
export class UserdataCollectComponent implements OnInit {
    userDataForm: FormGroup;
    pageNum: any = 1;
    pageSize: any = 10;
    tableLoading = false;
    pageSizeOptions = [10, 20, 30, 40, 50];
    userDataList: any = [];
    total: any = 0;
    dateRange: any = null;
    startDate: any = null;
    endDate: any = null;
    constructor(private userdataCollectServer: UserdataCollectServer, private message: NzMessageService, private fb: FormBuilder) {

    }
    ngOnInit(): void {
        this.userDataForm = this.fb.group({
            userName: [null],
            dateRange: [null],
            eventName: [null]
        });
        this.getUserdataCollect();
    }
    ngAfterViewInit(): void {

    }
    getUserdataCollect() {
        let params = {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            userName: this.userDataForm.value.userName,
            eventName: this.userDataForm.value.eventName,
            startDate: this.startDate,
            endDate: this.endDate
        };
        this.tableLoading = true;
        this.userdataCollectServer.getUserdataCollect(params).subscribe((res: any) => {
            this.tableLoading = false;
            if (res.code == 0) {
                this.userDataList = res.data.list;
                this.total = res.data.total;
            } else {
                this.userDataList = [];
                this.message.create('error', res.message ? res.message : '查询失败!');
            }
        });
    }

    changePage(event) {
        this.pageNum = event;
        this.getUserdataCollect();
    }

    changePageSize(event) {
        this.pageSize = event;
        this.getUserdataCollect();
    }

    changeDateRange($event) {
        this.startDate = moment($event[0]).format("YYYY-MM-DD HH:mm:ss");
        this.endDate = moment($event[1]).format("YYYY-MM-DD HH:mm:ss");
        this.getUserdataCollect();
    }

    clear(event: any) {
        if (!event || event.length <= 0) {
            this.startDate = '';
            this.endDate = '';
        }
    }
}