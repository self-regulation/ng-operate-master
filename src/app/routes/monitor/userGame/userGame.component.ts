import { Component, OnInit } from '@angular/core';
import { UserGameServer } from './userGame.server';
import { StorageService } from '@core/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'user-game',
    templateUrl: './userGame.component.html',
    providers: [UserGameServer]
})
export class UserGameComponent implements OnInit {
    pageIndex: number = 1;
    pageSize: number = 10;
    userGameList: any = [];
    tableLoading: boolean = false;
    total: any = 0;
    pageSizeOptions = [10, 20, 30, 40, 50];
    constructor(private userGameServer: UserGameServer, private storageService: StorageService, private message: NzMessageService) {

    }
    ngOnInit(): void {
        this.getGmUserPerformance();
        console.log(this.storageService.getMenuInfo());
    }
    getGmUserPerformance() {
        this.userGameServer.getGmUserPerformance({
            pageNum: this.pageIndex,
            pageSize: this.pageSize
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