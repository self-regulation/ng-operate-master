import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserActionService } from './user-action.service';
import { NzMessageService } from 'ng-zorro-antd';
import * as moment from 'moment';
import { Subject, forkJoin } from 'rxjs';

@Component({
    selector: 'user-action',
    templateUrl: './user-action.component.html',
    providers: [UserActionService]
})
export class UserActionComponent implements OnInit {
    // @ViewChild('virtualTable', { static: false }) nzTableComponent: NzTableComponent;
    private destroy$ = new Subject();
    operatForm: FormGroup;

    pageIndex = 1;
    pageSize = 10;
    total = 1;
    listOfData = [];
    loading = false;
    pageSizeOptions = [10, 20, 30, 40, 50];
    onlineStatus = { 0: '不在线', 1: '在线' };

    dateFormat: any = null;

    pictureList: any = {
        1: "最简",
        2: "简约",
        3: "均衡",
        4: "唯美",
        5: "高效",
        6: "电影",
        7: "极致"
    };
    taskStatusList: any = {
        1: "启动成功",
        2: "连接成功",
        3: "停止成功",
        4: "无服务器",
        5: "连接失败",
        6: "启动超时",
        7: "进程退出",
        8: "启动失败",
        9: "停止失败",
        10: "顶号登陆",
        21: "预启动连接",
        22: "预启动断连"
    };

    startTime: any = '';
    endTime: any = '';

    gameParam: any = null;
    showParamVisible: boolean = false;
    constructor(private fb: FormBuilder, private useractionService: UserActionService, private message: NzMessageService, ) {

    }

    ngOnInit(): void {
        this.operatForm = this.fb.group({
            userName: [null],
            serverName: [null],
            online: [null],
            dateRange: [null],
        });
        let gameVo = {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize

        }
        this.getGameTask(gameVo);
    }

    getGameTask(gameVo: any) {
        forkJoin([this.useractionService.getGameTask(gameVo), this.useractionService.getPictureList(), this.useractionService.getTaskStatusList()]).subscribe((res: any) => {
            if (res[0].code == 0) {
                this.listOfData = res[0].data.list;
                this.total = res[0].data.total;
            } else {
                this.message.create('error', res.message ? res.message : '查询失败!');
            }

            if (res[1].code == 0) {
                this.pictureList = res[1].data;
            }

            if (res[2].code == 0) {
                this.taskStatusList = res[2].data;
            }
        });
    }

    rearchAction() {
        let gameVo = {
            userName: this.operatForm.value.userName,
            serverName: this.operatForm.value.serverName,
            online: this.operatForm.value.online,
            startTime: this.startTime,
            endTime: this.endTime,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize

        }
        this.useractionService.getGameTask(gameVo).subscribe((res: any) => {
            if (res.code == 0) {
                if (res.data && res.data.list) {
                    this.listOfData = res.data.list;
                    this.total = res.data.total;
                }
            } else {
                this.message.create('error', res.message ? res.message : '查询失败!');
            }
        });
    }

    showParamDetail(detail: any) {
        console.log(detail);
        this.showParamVisible = true;
        this.gameParam = detail;
    }

    handleParamCancel() {
        this.showParamVisible = false;
    }

    onOk(event) {
        this.startTime = moment(event[0]).format("YYYY-MM-DD HH:mm");
        this.endTime = moment(event[1]).format("YYYY-MM-DD HH:mm");
    }

    changePage(event) {
        this.pageIndex = event;
        this.rearchAction();
    }

    changePageSize(event) {
        this.pageSize = event;
        this.rearchAction();
    }

    formatOnline(status: any) {
        return status ? (this.onlineStatus[status]) : '--';
    }

    formatPicture(types) {
        return types ? (this.pictureList[types]) : '--';
    }

    formatTaskStatus(status) {
        return status ? (this.taskStatusList[status]) : '--';
    }

    clear(event: any) {
        if (!event || event.length <= 0) {
            this.startTime = '';
            this.endTime = '';
        }
    }

}