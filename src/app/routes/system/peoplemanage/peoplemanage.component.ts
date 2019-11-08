import { OnInit, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { HttpBaseService } from '@core/net/http-base.service';
import { NzMessageService } from 'ng-zorro-antd';
import { PeoplemanageService } from './peoplemanage.service';
import { mobilePhoneValidator, alphaNumericValidator } from '@shared';
@Component({
    selector: 'people-manage',
    templateUrl: './peoplemanage.component.html',
    providers: [PeoplemanageService],
    styleUrls: ['./peoplemanage.component.less']
})
export class PeopleManageComponent implements OnInit {
    pageIndex = 1;
    pageSize = 10;
    total = 1;
    listOfData = [];
    loading = false;
    // isAllDisplayDataChecked = false;
    isOperating = false;
    pageSizeOptions = [10, 20, 30, 40, 50];
    searchForm: FormGroup;

    isVisible = false;
    userForm: FormGroup;

    allRoleList = [];
    modalTitle = '修改用户';
    // roleIds = "";
    constructor(private fb: FormBuilder, private httpBaseService: HttpBaseService, private message: NzMessageService, private peoplemanageService: PeoplemanageService) {

    }
    ngOnInit(): void {
        this.getUserList();
        this.getAllrole();
        this.searchForm = this.fb.group({
            loginName: [null],
            name: [null]
        });
        this.userForm = this.fb.group({
            name: [null, [Validators.required]],
            loginName: [null, [Validators.required, alphaNumericValidator]],
            password: [null, [Validators.required]],
            confirmPassword: [null, [Validators.required]],
            mobile: [null, [Validators.required, mobilePhoneValidator]],
            loginFlag: [null, [Validators.required]],
            roleIds: [null],
            remark: [null],
        });
    }

    deleteUser(userId) {
        this.peoplemanageService.deleteUser(userId).subscribe((res: any) => {
            if (res.code == 0) {
                this.message.create('success', res.message ? res.message : '操作成功!');
                this.getUserList();
            } else {
                this.message.create('error', res.message ? res.message : '操作失败!');
            }
        });
    }

    // checkAll(value: boolean): void {
    //     console.log(value);
    //     if (value) {
    //         this.listOfData.forEach((res: any) => {
    //             res['checked'] = true;
    //         });
    //     } else {
    //         this.listOfData.forEach((res: any) => {
    //             res['checked'] = false;
    //         });
    //     }
    // }

    refreshStatus(index): void {
        this.listOfData.forEach((item: any, i) => {
            if (i == index) {
                item['checked'] = !item['checked'];
            }
        });
        // this.isAllDisplayDataChecked = this.listOfData.every(item => item['checked'] == true);
    }
    getUserList(param?: any) {
        let params = {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
        };
        if (param && param.loginName) {
            params["loginName"] = param.loginName;
        }
        if (param && param.name) {
            params["name"] = param.name;
        }
        this.loading = true;
        this.peoplemanageService.getUserList(params).subscribe((response: any) => {
            this.loading = false;
            if (response.code == 0 && response.data) {
                this.total = response.data.total;
                this.listOfData = response.data.list;
            } else {
                this.message.create('error', response.message ? response.message : '操作失败!');
            }

        });
    }

    changePageIndex(event) {
        this.pageIndex = event;
        this.getUserList();
    }

    changePageSize(event) {
        this.pageSize = event;
        this.getUserList();
    }

    modifyUserData() {
        for (const i in this.userForm.controls) {
            this.userForm.controls[i].markAsDirty();
            this.userForm.controls[i].updateValueAndValidity();
        }
        this.allRoleList.map((role: any) => {
            return role.value && role.checked == true;
        });
        let selectRoles = [];
        this.allRoleList.forEach((role: any) => {
            if (role.checked == true) {
                selectRoles.push(role.value);
            }
        });
        this.userForm.value.roleIds = selectRoles;
        if (this.userForm.status === "INVALID") {
            console.log(this.userForm);
            this.message.create('warnning', '填写信息不完整!');
            return;
        }
        if (this.userForm.value.roleIds.length <= 0) {
            this.message.create('warnning', '用户角色必填!');
            return;
        }

        console.log(this.userForm);
        this.peoplemanageService.saveOrUpdatePeopleinfo(this.userForm.value).subscribe((res: any) => {
            this.isVisible = false;
            if (res.code == 0) {
                this.message.create('success', res.message ? res.message : '操作成功!');
                this.getUserList();
            } else {
                this.message.create('error', res.message ? res.message : '操作失败!');
            }
        });
    }

    addPeople() {
        this.isVisible = true;
        this.modalTitle = '添加用户';
        this.userForm = this.fb.group({
            name: [null, [Validators.required]],
            loginName: [null, [Validators.required, alphaNumericValidator]],
            password: [null, [Validators.required]],
            confirmPassword: [null, [Validators.required]],
            mobile: [null, [Validators.required, mobilePhoneValidator]],
            loginFlag: ['1', [Validators.required]],
            roleIds: [null],
            remark: [null],
        });
    }

    updateUser(userItem: any) {
        this.modalTitle = '修改用户';
        this.isVisible = true;

        this.userForm = this.fb.group({
            id: [userItem.id],
            name: [userItem.name, [Validators.required]],
            loginName: [userItem.loginName, [Validators.required]],
            password: [userItem.password, [Validators.required]],
            confirmPassword: [null, [Validators.required]],
            mobile: [userItem.mobile, [Validators.required]],
            loginFlag: [userItem.loginFlag, [Validators.required]],
            roleIds: [(userItem.roleIds).split(",")],
            // roleIds: [true, false, true, false],
            remark: [userItem.remark],
        });
        (userItem.roleIds).split(",").forEach((item: any) => {
            this.allRoleList.forEach((role: any, index) => {
                if (item == role.value) {
                    this.allRoleList[index].checked = true;
                }
            });
        });
        console.log(this.allRoleList);
    }

    getAllrole() {
        this.peoplemanageService.getAllrole().subscribe((res: any) => {
            if (res.code == 0) {
                this.allRoleList = [];
                res.data.forEach((item: any) => {
                    let option = {
                        "checked": false,
                        "value": item.id,
                        "label": item.name
                    };
                    this.allRoleList.push(option);
                });
            } else {
                this.message.create('error', res.message ? res.message : '获取角色信息失败!');
            }
        });
    }
    selectRoles(index, event) {
        this.allRoleList[index].checked = event;
    }

    checkRoles(value: object[]) {
        console.log(value);
    }

    handleCancel() {
        this.isVisible = false;
        this.allRoleList.forEach((role: any, index) => {
            this.allRoleList[index].checked = false;
        });
    }

    searchUser() {
        let params = {};
        console.log(this.searchForm.value.loginName);
        console.log(this.searchForm.value.name);
        if (this.searchForm.value.loginName) {
            params["loginName"] = this.searchForm.value.loginName;
        }
        if (this.searchForm.value.name) {
            params["name"] = this.searchForm.value.name;
        }
        this.getUserList(params);
    }

}