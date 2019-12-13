import { Component, OnInit } from '@angular/core';
import { ApiListService } from './api-list.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: "api-list",
    templateUrl: "api-list.component.html",
    providers: [ApiListService]
})
export class ApiListComponent implements OnInit {
    apiForm: FormGroup;
    addApiListForm: FormGroup;
    pageNum: any = 1;
    pageSize: any = 10;
    tableLoading = false;
    pageSizeOptions = [10, 20, 30, 40, 50];
    allApiList: any = [];
    total: any = 0;
    modalLoading: boolean = false;
    addApiListVisible: boolean = false;
    constructor(private apiListService: ApiListService, private message: NzMessageService, private fb: FormBuilder) {

    }

    ngOnInit(): void {
        this.apiForm = this.fb.group({
            name: [null],
            path: [null]
        });
        this.addApiListForm = this.fb.group({
            name: [null, [Validators.required]],
            menukey: [null, [Validators.required]],
            path: [null, [Validators.required]],
            remarks: [null],
        });
        this.getAllRoleApi();
    }

    getAllRoleApi() {
        let params = {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            name: this.apiForm.value.name,
            path: this.apiForm.value.path
        }
        this.tableLoading = true;
        this.apiListService.getAllRoleApi(params).subscribe((res: any) => {
            this.tableLoading = false;
            if (res.code == 0) {
                this.allApiList = res.data.list;
                this.total = res.data.total;
            } else {
                this.message.create('error', res.message ? res.message : '操作失败!');
            }
        });
    }

    deleteApi(apiId: any) {
        this.apiListService.deleteApi({ id: apiId }).subscribe((res: any) => {
            if (res.code == 0) {
                this.message.create('success', res.message ? res.message : '操作成功!');
                this.getAllRoleApi();
            } else {
                this.message.create('error', res.message ? res.message : '操作失败!');
            }
        });
    }

    addApi() {
        this.addApiListForm = this.fb.group({
            name: [null, [Validators.required]],
            menukey: [null, [Validators.required]],
            path: [null, [Validators.required]],
            remarks: [null],
        });
        this.addApiListVisible = true;
    }

    addApiOk() {
        for (const i in this.addApiListForm.controls) {
            this.addApiListForm.controls[i].markAsDirty();
            this.addApiListForm.controls[i].updateValueAndValidity();
        }
        if (this.addApiListForm.status === "INVALID") {
            this.message.create('warring', '请完整填写数据!');
            return
        }
        let params = {
            name: this.addApiListForm.value.name,
            path: this.addApiListForm.value.path,
            menukey: this.addApiListForm.value.menukey,
            remarks: this.addApiListForm.value.remarks
        };
        this.modalLoading = true;
        this.apiListService.addApi(params).subscribe((res: any) => {
            this.modalLoading = false;
            if (res.code == 0) {
                this.message.create('success', res.message ? res.message : '操作成功!');
                this.addApiListVisible = false;
                this.getAllRoleApi();
            } else {
                this.message.create('error', res.message ? res.message : '操作失败!');
            }
        });
    }

    addApiCancel() {
        this.addApiListVisible = false;
    }

    changePage(event) {
        this.pageNum = event;
        this.getAllRoleApi();
    }

    changePageSize(event) {
        this.pageSize = event;
        this.getAllRoleApi();
    }

}