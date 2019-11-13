import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { userRetain } from '@shared';
import { UserRetainServer } from './user-retain.server';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'user-retain',
    templateUrl: './user-retain.component.html',
    providers: [UserRetainServer]
})
export class UserRetainComponent implements OnInit {
    userRetainForm: FormGroup;
    startTime: any = moment().subtract(7, 'day').format('YYYY-MM-DD');
    endTime: any = moment().format('YYYY-MM-DD');
    userRetainList: any = [];
    dateRange: any = [moment().subtract(7, 'day').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
    stayDays: any = 7; //持续的天数
    dayList: any = [];
    bindList: any = [];
    stayDayList: any = [{ text: '次日', value: 1 }, { text: '一周', value: 7, byDefault: true }, { text: '两周', value: 14 }, { text: '一个月', value: 30 }];
    loading: boolean = false;
    constructor(private fb: FormBuilder, private userRetainServer: UserRetainServer, private message: NzMessageService) {

    }

    ngOnInit(): void {
        this.userRetainForm = this.fb.group({
            dateRange: [null],
        });

        this.dayList.length = this.stayDays;


        this.getUserRetainData();
    }

    getUserRetainData(params?: any) {
        // this.userRetainList = (userRetain()).rows;
        let param = {
            startDate: this.startTime,
            endDate: this.endTime,
            stayDays: this.stayDays
        };
        this.userRetainList = [];
        this.loading = true;
        this.userRetainServer.getUserRetentionList(param).subscribe((res: any) => {
            this.loading = false;
            if (res.code == 0) {
                if (JSON.stringify(res.data) != '{}') {
                    for (let time in res.data) {
                        let item = {
                            dateTime: time,
                            datas: res.data[time]
                        };
                        this.userRetainList.push(item);
                    }
                    this.bindList = this.userRetainList;
                } else {
                    this.bindList = [];
                    this.userRetainList = [];
                }
                console.log(this.userRetainList);
            } else {
                this.message.create('error', res.message ? res.message : '查询数据失败!');
            }
        });
    }

    changeDateRange($event) {
        this.startTime = moment($event[0]).format('YYYY-MM-DD HH:mm');
        this.endTime = moment($event[1]).format('YYYY-MM-DD HH:mm');
        this.dateRange = [this.startTime, this.endTime];
        this.getUserRetainData();
    }

    searchData() {
        this.dateRange = [this.startTime, this.endTime];
        this.getUserRetainData();
    }

    changeDays(event) {
        if (this.stayDays == event) {
            return;
        } else if (!event) {
            event = 7;
        }
        this.stayDays = event;
        this.getUserRetainData();
        this.dayList.length = event;
    }

    clear(event: any) {
        if (!event || event.length <= 0) {
            this.startTime = '';
            this.endTime = '';
        }
    }
}