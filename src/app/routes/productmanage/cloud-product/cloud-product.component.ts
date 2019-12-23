import { Component, OnInit } from '@angular/core';
import { CloudProductServer } from './cloud-product.server';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: "cloud-product",
    templateUrl: "./cloud-product.component.html",
    providers: [CloudProductServer]
})
export class CloudProductComponent implements OnInit {
    productForm: FormGroup;
    pageNum: number = 1;
    pageSize: number = 10;
    cloudProductList: any = [];
    total: number = 0;
    tableLoading: boolean = false;
    pageSizeOptions = [10, 20, 30, 40, 50];
    productType: any = { "1": "月卡", "2": "点卡" };
    constructor(private fb: FormBuilder, private cloudProductServer: CloudProductServer, private message: NzMessageService) {

    }
    ngOnInit(): void {
        this.productForm = this.fb.group({
            productName: [null],
            productType: [null],
            gameName: [null],
            gameId: [null]
        });
        this.getProductList();
    }

    getProductList() {
        let params = {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            productName: this.productForm.value.productName,
            productType: this.productForm.value.productType,
            gameName: this.productForm.value.gameName,
            gameId: this.productForm.value.gameId
        };
        this.tableLoading = true;
        this.cloudProductServer.getProductList(params).subscribe((res: any) => {
            this.tableLoading = false;
            if (res.code == 0) {
                this.cloudProductList = res.data.list;
                this.total = res.data.total;
            } else {
                this.cloudProductList = [];
                this.message.create('error', res.message ? res.message : '查询失败!');
            }
        });

    }

    changePage(event) {
        this.pageNum = event;
        this.getProductList();
    }

    changePageSize(event) {
        this.pageSize = event;
        this.getProductList();
    }
}