import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { GameBillService } from './game-bill.service';

@Component({
    selector: "game-bill",
    templateUrl: "./game-bill.component.html",
    providers: [GameBillService]
})
export class GameBillComponent implements OnInit {
    chargeLogForm: FormGroup;
    pageNum: number = 1;
    pageSize: number = 10;
    chargeLogList: any = [];
    total: number = 0;
    tableLoading: boolean = false;
    pageSizeOptions = [10, 20, 30, 40, 50];
    type: any = { "0": "结束", "1": "开始" };
    allPictureTypes: any = { '1': '最简', '2': '简约', '3': '均衡', '4': '唯美', '5': '高效', '6': '电影', '7': '极致' };
    constructor(private rechargeUserService: GameBillService, private fb: FormBuilder, private message: NzMessageService) {

    }
    ngOnInit(): void {
        this.chargeLogForm = this.fb.group({
            userName: [null],
            type: [null],
            gameId: [null],
            picture: [null],
            resource: [null]
        });
        this.getChargeLogList();
    }
    getChargeLogList() {
        let params = {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            userName: this.chargeLogForm.value.userName,
            type: this.chargeLogForm.value.type,
            gameId: this.chargeLogForm.value.gameId,
            picture: this.chargeLogForm.value.picture,
            resource: this.chargeLogForm.value.resource
        };
        this.tableLoading = true;
        this.rechargeUserService.getChargeLogList(params).subscribe((res: any) => {
            this.tableLoading = false;
            if (res.code == 0) {
                this.chargeLogList = res.data.list;
                this.total = res.data.total;
            } else {
                this.chargeLogList = [];
                this.message.create('error', res.message ? res.message : '查询失败!');
            }
        });
    }

    changePage(event) {
        this.pageNum = event;
        this.getChargeLogList();
    }

    changePageSize(event) {
        this.pageSize = event;
        this.getChargeLogList();
    }
}