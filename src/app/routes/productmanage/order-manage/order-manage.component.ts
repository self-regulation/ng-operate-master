import { Component, OnInit } from '@angular/core';
import { OrderManageServer } from './order-manage.server';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: "order-manage",
    templateUrl: "./order-manage.component.html",
    providers: [OrderManageServer]
})
export class OrderManageComponent implements OnInit {
    orderForm: FormGroup;
    pageNum: number = 1;
    pageSize: number = 10;
    orderList: any = [];
    total: number = 0;
    tableLoading: boolean = false;
    pageSizeOptions = [10, 20, 30, 40, 50];
    constructor(private orderManageServer: OrderManageServer, private fb: FormBuilder, private message: NzMessageService) {

    }
    ngOnInit(): void {
        this.orderForm = this.fb.group({
            productName: [null],
            userName: [null],
            orderId: [null]
        });
        this.getOrderList();
    }

    getOrderList() {
        let params = {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            productName: this.orderForm.value.productName,
            userName: this.orderForm.value.userName,
            orderId: this.orderForm.value.orderId,
        };
        this.tableLoading = true;
        this.orderManageServer.getOrderList(params).subscribe((res: any) => {
            this.tableLoading = false;
            if (res.code == 0) {
                this.orderList = res.data.list;
                this.total = res.data.total;
            } else {
                this.orderList = [];
                this.message.create('error', res.message ? res.message : '查询失败!');
            }
        });

    }

    changePage(event) {
        this.pageNum = event;
        this.getOrderList();
    }

    changePageSize(event) {
        this.pageSize = event;
        this.getOrderList();
    }
}