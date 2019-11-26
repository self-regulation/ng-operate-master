import { Component, OnInit } from '@angular/core';
import { UserGameServer } from './userGame.server';
import { StorageService } from '@core/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'user-game',
    templateUrl: './userGame.component.html',
    providers: [UserGameServer]
})
export class UserGameComponent implements OnInit {
    userGameForm: FormGroup;
    pageIndex: number = 1;
    pageSize: number = 10;
    userGameList: any = [];
    tableLoading: boolean = false;
    total: any = 0;
    pageSizeOptions = [10, 20, 30, 40, 50];
    constructor(private userGameServer: UserGameServer, private storageService: StorageService, private message: NzMessageService, private fb: FormBuilder) {

    }
    ngOnInit(): void {
        this.userGameForm = this.fb.group({
            taskId: [null],
            userName: [null]
        });
        this.getGmUserPerformance();
    }
    getGmUserPerformance() {
        this.userGameServer.getGmUserPerformance({
            pageNum: this.pageIndex,
            pageSize: this.pageSize,
            taskId: this.userGameForm.value.taskId,
            user: this.userGameForm.value.userName
        }).subscribe((res: any) => {
            console.log(res);
            if (res.code == 0) {
                this.userGameList = res.data.list;
                this.total = res.data.total;
            } else {
                this.userGameList = [];
                this.message.create('error', res.message ? res.message : '查询数据失败!');
            }
        });
    }
    formateData(data) {
        return JSON.parse(data).min;
    }
    changePage(event) {
        this.pageIndex = event;
        this.getGmUserPerformance();
    }
    changePageSize(event) {
        this.pageSize = event;
        this.getGmUserPerformance();
    }
}