import { Component, OnInit } from '@angular/core';
import { ApiAuthorizationService } from './api-authorization.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: "api-authorization",
    templateUrl: "./api-authorization.component.html",
    styleUrls: ["./api-authorization.component.less"],
    providers: [ApiAuthorizationService]
})
export class ApiAuthorizationComponent implements OnInit {
    allRoleList: any = null;
    selectRoleIndex: any = null;
    pageNum: any = 1;
    pageSize: any = 10;
    tableLoading = false;
    roleOfApiList: any = [];
    total: any = 0;
    pageSizeOptions = [10, 20, 30, 40, 50];
    roleId: any = null;
    addApiListVisible: boolean = false;
    modalLoading: boolean = false;
    apiForm: FormGroup;
    allApiList: any = [];
    allApiTotal: any = 0;
    allApiPageNum: any = 1;
    allApiPageSize: any = 10;
    allApiTableLoading = false;
    allApiPageSizeOptions = [10, 20, 30, 40, 50];
    isAllDisplayDataChecked: boolean = false;
    isShowPagination: boolean = true;
    constructor(private apiAuthorizationService: ApiAuthorizationService, private message: NzMessageService, private fb: FormBuilder) {

    }

    ngOnInit(): void {
        this.apiForm = this.fb.group({
            name: [null],
            path: [null]
        });
        this.getAllRole();
    }
    getAllRole() {
        this.tableLoading = true;
        this.apiAuthorizationService.getAllRole().subscribe((res: any) => {
            console.log(res);

            if (res.code == 0) {
                this.allRoleList = res.data;
                if (!this.selectRoleIndex) {
                    this.selectRoleIndex = 0;
                }
                this.roleId = this.allRoleList[this.selectRoleIndex].id;
                this.getRoleApiByRoleId();
            } else {
                this.message.create('error', res.message ? res.message : '查询失败!');
            }
        });
    }

    selectMenu(menu: any, menuIndex) {
        this.selectRoleIndex = menuIndex;
        this.roleId = this.allRoleList[this.selectRoleIndex].id;
        this.pageNum = 1;
        this.getRoleApiByRoleId();

    }

    getRoleApiByRoleId() {
        let params = {
            roleId: this.roleId,
            pageNum: this.pageNum,
            pageSize: this.pageSize
        };
        this.tableLoading = true;
        this.apiAuthorizationService.getRoleApiByRoleId(params).subscribe((res: any) => {
            this.tableLoading = false;
            if (res.code == 0) {
                this.roleOfApiList = res.data.list;
                this.total = res.data.total;
            } else {
                this.roleOfApiList = [];
            }
        });
    }

    deleteApi(menuId: any) {
        let params = {
            roleId: this.roleId,
            menuId: menuId
        };
        this.apiAuthorizationService.deleteRoleApiByRoleId(params).subscribe((res: any) => {
            if (res.code == 0) {
                this.message.create('success', res.message ? res.message : '操作成功!');
                this.getRoleApiByRoleId();
            } else {
                this.message.create('error', res.message ? res.message : '操作失败!');
            }
        });
    }
    //显示添加API权限 框
    addApiAuthorization() {
        this.allApiPageNum = 1;
        this.allApiPageSize = 10;
        this.addApiListVisible = true;
        this.allApiList = [];
        this.isAllDisplayDataChecked = false;
        this.isShowPagination = true;
        this.apiForm = this.fb.group({
            name: [null],
            path: [null]
        });
        this.getAllRoleApi();
    }

    //查询所有的API列表
    getAllRoleApi() {
        let checkedApiList = this.allApiList.filter((item: any) => {
            return item["checked"] == true;
        });
        if (checkedApiList.length > 0) {
            this.message.create('warnnig', '请先将勾选的API权限完成添加操作!');
            return;
        }
        let params = {
            pageNum: this.allApiPageNum,
            pageSize: this.allApiPageSize,
            name: this.apiForm.value.name,
            path: this.apiForm.value.path
        }
        this.modalLoading = true;
        this.allApiTableLoading = true;
        this.apiAuthorizationService.getAllRoleApi(params).subscribe((res: any) => {
            this.modalLoading = false;
            this.allApiTableLoading = false;
            if (res.code == 0) {
                this.allApiList = res.data.list;
                this.allApiList.forEach((item: any, index) => {
                    this.allApiList[index]["checked"] = false;
                });
                this.allApiTotal = res.data.total;
            } else {
                this.message.create('error', res.message ? res.message : '操作失败!');
            }
        });
    }

    addApiCancel() {
        this.addApiListVisible = false;
    }

    addApiOk() {
        let checkedApiList = this.allApiList.filter((item: any) => {
            return item["checked"] == true;
        });
        if (checkedApiList.length == 0) {
            this.message.create('warnnig', '请勾选需要添加的API权限!');
            return;
        }
        let checkedIdList = checkedApiList.map((item: any) => {
            return item.id;
        });
        let params = {
            roleId: this.roleId,
            menuIds: checkedIdList
        };
        this.modalLoading = true;
        this.apiAuthorizationService.addRoleApi(params).subscribe((res: any) => {
            this.modalLoading = false;
            if (res.code == 0) {
                this.message.create('success', res.message ? res.message : '操作成功!');
                this.addApiListVisible = false;
                this.getRoleApiByRoleId();
            } else {
                this.message.create('error', res.message ? res.message : '操作失败!');
            }
        });

    }

    changePage(event) {
        this.pageNum = event;
        this.getRoleApiByRoleId();
    }

    changePageSize(event) {
        this.pageSize = event;
        this.getRoleApiByRoleId();
    }

    changeAllApiPage(event) {
        let checkedApiList = this.allApiList.filter((item: any) => {
            return item["checked"] == true;
        });
        if (checkedApiList.length > 0) {
            this.message.create('warnnig', '请先将勾选的API权限完成添加操作!');
            return;
        }
        this.allApiPageNum = event;
        this.getAllRoleApi();
    }

    changeAllApiPageSize(event) {
        let checkedApiList = this.allApiList.filter((item: any) => {
            return item["checked"] == true;
        });
        if (checkedApiList.length > 0) {
            this.message.create('warnnig', '请先将勾选的API权限完成添加操作!');
            return;
        }
        this.allApiPageSize = event;
        this.getAllRoleApi();
    }

    //API勾选所有
    checkAll(event) {
        if (event) {
            this.allApiList.forEach((item: any, index) => {
                this.allApiList[index]["checked"] = true;
                this.isShowPagination = false;
            });
        } else {
            this.allApiList.forEach((item: any, index) => {
                this.allApiList[index]["checked"] = false;
                this.isShowPagination = true;
            });
        }
    }

    refreshStatus(status, menuId, index): void {
        console.log(status);
        console.log(menuId);
        console.log(index);
        console.log(this.allApiList);
        this.allApiList[index].checked = !this.allApiList[index].checked;
        let checkedApiList = this.allApiList.filter((item: any) => {
            return item["checked"] == true;
        });
        console.log(checkedApiList);
        if (checkedApiList.length > 0) {
            this.isShowPagination = false;
        } else {
            this.isShowPagination = true;
        }

    }

}