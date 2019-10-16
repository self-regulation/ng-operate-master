import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { STColumn } from '@delon/abc';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzFormatEmitEvent, NzMessageService } from 'ng-zorro-antd';
import { RolemanageService } from './rolemanage.service';

@Component({
    selector: 'app-rolemanage',
    templateUrl: './rolemanage.component.html',
    providers: [RolemanageService]
})
export class RoleManageComponent implements OnInit {
    allRoleList: any = [];

    pageIndex = 1;
    pageSize = 10;
    total = 1;
    listOfData = [];
    loading = true;

    isAllDisplayDataChecked = false;
    isOperating = false;
    // isIndeterminate = false;
    pageSizeOptions = [10, 20, 30, 40, 50];
    searchForm: FormGroup;

    isVisible = false;
    selectRoleType = null;
    systemData = null;
    addRoleForm: FormGroup;
    modalTitle = '添加角色';
    popTitle = '提示头部';
    status = [
        { index: 0, text: '超级管理员', value: false, type: 'default', checked: false },
        {
            index: 1,
            text: '管理员',
            value: false,
            type: 'processing',
            checked: false,
        },
        { index: 2, text: '运营人员', value: false, type: 'success', checked: false },
        { index: 3, text: '开发人员', value: false, type: 'error', checked: false },
    ];
    columns: STColumn[] = [
        { title: '', index: 'key', type: 'checkbox' },
        { title: 'ID', index: 'id' },
        { title: '角色名', index: 'roleName' },
        {
            title: '权限范围',
            index: 'permission',
        },
        {
            title: '具体描述',
            index: 'des',
        },
        {
            title: '操作',
            buttons: [
                {
                    text: '分配',
                    click: (item: any) => { },
                },
                {
                    text: '修改',
                    click: (item: any) => { },
                },
                {
                    text: '删除',
                    click: (item: any) => { },
                },
            ],
        },
    ];

    defaultExpandedKeys = ['0-0', '0-0-0', '0-0-1'];

    nodes = [
        {
            title: '0-0',
            key: '0-0',
            expanded: true,
            children: [
                {
                    title: '0-0-0',
                    key: '0-0-0',
                    children: [
                        { title: '0-0-0-0', key: '0-0-0-0', isLeaf: true },
                        { title: '0-0-0-1', key: '0-0-0-1', isLeaf: true },
                        { title: '0-0-0-2', key: '0-0-0-2', isLeaf: true }
                    ]
                },
                {
                    title: '0-0-1',
                    key: '0-0-1',
                    children: [
                        { title: '0-0-1-0', key: '0-0-1-0', isLeaf: true },
                        { title: '0-0-1-1', key: '0-0-1-1', isLeaf: true },
                        { title: '0-0-1-2', key: '0-0-1-2', isLeaf: true }
                    ]
                },
                {
                    title: '0-0-2',
                    key: '0-0-2',
                    isLeaf: true
                }
            ]
        },
        {
            title: '0-1',
            key: '0-1',
            children: [
                { title: '0-1-0-0', key: '0-1-0-0', isLeaf: true },
                { title: '0-1-0-1', key: '0-1-0-1', isLeaf: true },
                { title: '0-1-0-2', key: '0-1-0-2', isLeaf: true }
            ]
        },
        {
            title: '0-2',
            key: '0-2',
            isLeaf: true
        }
    ];

    constructor(
        private fb: FormBuilder,
        private rolemanageService: RolemanageService,
        private message: NzMessageService,
        private nzMessageService: NzMessageService
    ) {
        this.searchForm = this.fb.group({
            allRole: [null]
        });

        this.addRoleForm = this.fb.group({
            name: [null, [Validators.required]],
            selectRole: [null, Validators.required],
            systemData: [null, Validators.required],
            remarks: [null]
        });
    }

    ngOnInit() {
        this.getRoleList();
        this.getAllRole();
    }
    checkAll(value: boolean): void {
        console.log(value);
        if (value) {
            this.listOfData.forEach((res: any) => {
                res['checked'] = true;
            });
        } else {
            this.listOfData.forEach((res: any) => {
                res['checked'] = false;
            });
        }
    }

    currentPageDataChange($event: Array<{ id: number; name: string; age: number; address: string }>): void {
        // this.listOfDisplayData = $event;
        // this.refreshStatus();
    }

    getRoleList(param?: any) {
        let params = {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
        }
        if (param && param.name) {
            params["name"] = param.name;
        }
        this.rolemanageService.getRoleList(params).subscribe((res: any) => {
            this.loading = false;
            if (res.code == 0) {
                this.listOfData = res.data;
            }
        });
    }

    getAllRole() {
        this.rolemanageService.getAllRole().subscribe((res: any) => {
            console.log(res);
            if (res.code == 0) {
                this.allRoleList = res.data;
            } else {
                this.allRoleList = [];
            }
        });
    }

    searchRole() {
        let params = {
            name: this.searchForm.value.allRole
        }
        this.getRoleList(params);
    }

    changePageIndex(event) {
        this.pageIndex = event;
        this.getRoleList();
    }

    changePageSize(event) {
        this.pageSize = event;
        this.getRoleList();
    }

    updateUser(userData: any) {
        console.log(userData);
        this.modalTitle = '修改角色';
        this.isVisible = true;

        this.addRoleForm = this.fb.group({
            name: [userData.name, [Validators.required]],
            selectRole: [null, Validators.required],
            systemData: [null, Validators.required],
            remarks: [userData.remarks]
        });
    }

    addRole(): void {
        this.isVisible = true;

    }
    //批量删除
    batchDelete() {
        this.nzMessageService.info('该功能暂未开放！');
    }

    addRolemanage() {
        this.rolemanageService.saveRole(this.addRoleForm.value).subscribe((res: any) => {
            this.isVisible = false;
            console.log(res);
            if (res.code == 0) {
                this.message.create('success', res.message ? res.message : '操作成功!');
                this.getRoleList();
            } else {
                this.message.create('error', res.message ? res.message : '操作失败!');
            }
        });
    }

    //删除角色
    deleteRole(id) {
        this.rolemanageService.deleteRole(id).subscribe((res: any) => {
            if (res.code == 0) {
                this.message.create('success', res.message ? res.message : '操作成功!');
                this.getRoleList();
            } else {
                this.message.create('error', res.message ? res.message : '操作失败!');
            }

        });
    }

    cancel(): void {
        this.nzMessageService.info('click cancel');
    }

    handleCancel(): void {
        console.log('Button cancel clicked!');
        this.isVisible = false;
    }

    nzEvent(event: NzFormatEmitEvent): void {
        // console.log(event.getCheckedNodeList());
    }

}
