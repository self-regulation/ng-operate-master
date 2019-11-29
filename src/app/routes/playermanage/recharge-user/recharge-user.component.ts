import { Component, OnInit } from '@angular/core';
import { RechargeUserService } from './recharge-user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: "recharge-user",
    templateUrl: "./recharge-user.component.html",
    providers: [RechargeUserService]
})
export class RechargeUserComponent implements OnInit {
    chargeForm: FormGroup;
    pageNum: number = 1;
    pageSize: number = 10;
    chargeUserList: any = [];
    total: number = 0;
    tableLoading: boolean = false;
    pageSizeOptions = [10, 20, 30, 40, 50];
    online: any = { "0": "离线", "1": "在线" };
    status: any = { "0": "试玩", "1": "正常玩" };
    constructor(private rechargeUserService: RechargeUserService, private fb: FormBuilder, private message: NzMessageService) {

    }
    ngOnInit(): void {
        this.chargeForm = this.fb.group({
            userName: [null],
            status: [null],
            gameId: [null],
            online: [null]
        });
        this.getChargeUserList();
    }
    getChargeUserList() {
        let params = {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            userName: this.chargeForm.value.userName,
            status: this.chargeForm.value.status,
            gameId: this.chargeForm.value.gameId,
            online: this.chargeForm.value.online
        };
        this.tableLoading = true;
        this.rechargeUserService.getChargeUserList(params).subscribe((res: any) => {
            this.tableLoading = false;
            if (res.code == 0) {
                this.chargeUserList = res.data.list;
                this.total = res.data.total;
            } else {
                this.chargeUserList = [];
                this.message.create('error', res.message ? res.message : '查询失败!');
            }
        });
    }

    changePage(event) {
        this.pageNum = event;
        this.getChargeUserList();
    }

    changePageSize(event) {
        this.pageSize = event;
        this.getChargeUserList();
    }
}