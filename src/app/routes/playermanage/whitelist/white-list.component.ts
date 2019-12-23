import { Component, OnInit } from '@angular/core';
import { WhiteListService } from './white-list.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { positiveValidator, usernameValidator } from '@shared';

@Component({
    selector: "while-list",
    templateUrl: "./white-list.component.html",
    providers: [WhiteListService]
})
export class WhiteListComponent implements OnInit {
    whiteListForm: FormGroup;
    whiteModalForm: FormGroup;
    whiteList: any = [];
    tableLoading: boolean = false;
    total: number = 0;
    pageNum: number = 1;
    pageSize: number = 10;
    pageSizeOptions = [10, 20, 30, 40, 50];
    status: any = { "0": "不在白名单中", "1": "在白名单中" };
    userType: any = { "1": "管理员", "2": "开发人员", "3": "普通玩家" };
    modalTitle: string = "新增玩家";
    whiteVisible: boolean = false;
    modalLoading: boolean = false;
    isAddUser: boolean = true;
    modifyUser: any = null;
    constructor(private whiteListService: WhiteListService, private fb: FormBuilder, private message: NzMessageService) {

    }
    ngOnInit(): void {
        this.whiteListForm = this.fb.group({
            userName: [null],
            status: [null],
            playerType: [null]
        });
        this.whiteModalForm = this.fb.group({
            gameId: [null, [Validators.required]],
            userName: [null, [Validators.required, usernameValidator]],
            status: [null, [Validators.required]],
            playerType: [null, [Validators.required]],
            disGameId: [true]
        });
        this.getWhiteUserList();
    }
    getWhiteUserList() {
        let params = {
            userName: this.whiteListForm.value.userName,
            status: this.whiteListForm.value.status,
            playerType: this.whiteListForm.value.playerType,
            pageNum: this.pageNum,
            pageSize: this.pageSize
        };
        this.tableLoading = true;
        this.whiteListService.getWhiteUserList(params).subscribe((res: any) => {
            this.tableLoading = false;
            if (res.code == 0) {
                this.whiteList = res.data.list;
                this.total = res.data.total;
            } else {
                this.whiteList = [];
                this.message.create('error', res.message ? res.message : '查询失败!');
            }
        });
    }

    changePage(event) {
        this.pageNum = event;
        this.getWhiteUserList();
    }

    changePageSize(event) {
        this.pageSize = event;
        this.getWhiteUserList();
    }

    addUser() {
        this.modalTitle = "新增玩家";
        this.whiteModalForm = this.fb.group({
            gameId: [null, [Validators.required]],
            userName: [null, [Validators.required]],
            status: [null, [Validators.required]],
            playerType: [null, [Validators.required]],
            disGameId: [false]
        });
        this.whiteVisible = true;
        this.isAddUser = true;
    }

    modalOk() {
        if (this.isAddUser) {
            for (const i in this.whiteModalForm.controls) {
                this.whiteModalForm.controls[i].markAsDirty();
                this.whiteModalForm.controls[i].updateValueAndValidity();
            }
            if (this.whiteModalForm.status === "INVALID") {
                this.message.create('warring', '请完整填写数据!');
                return
            }
            let params = {
                gameId: this.whiteModalForm.value.gameId,
                userName: this.whiteModalForm.value.userName,
                status: this.whiteModalForm.value.status,
                playerType: this.whiteModalForm.value.playerType
            };
            this.whiteListService.addUser(params).subscribe((res: any) => {
                if (res.code == 0) {
                    this.message.create('success', res.message ? res.message : '操作成功!');
                    this.getWhiteUserList();
                    this.whiteVisible = false;
                } else {
                    this.message.create('error', res.message ? res.message : '操作失败!');
                }
            });
        } else {
            for (const i in this.whiteModalForm.controls) {
                this.whiteModalForm.controls[i].markAsDirty();
                this.whiteModalForm.controls[i].updateValueAndValidity();
            }
            if (this.whiteModalForm.status === "INVALID") {
                this.message.create('warring', '请完整填写数据!');
                return
            }
            let params = {
                id: this.modifyUser.id,
                status: this.whiteModalForm.value.status,
                playerType: this.whiteModalForm.value.playerType,
                userName: this.whiteModalForm.value.userName
            };
            this.whiteListService.updateUser(params).subscribe((res: any) => {
                if (res.code == 0) {
                    this.message.create('success', res.message ? res.message : '操作成功!');
                    this.getWhiteUserList();
                    this.whiteVisible = false;
                } else {
                    this.message.create('error', res.message ? res.message : '操作失败!');
                }
            });
        }

    }

    modalCancel() {
        this.whiteVisible = false;
        this.modifyUser = null;
    }

    //修改用户状态
    updateStatus(user: any) {
        this.modifyUser = user;
        this.whiteModalForm = null;
        this.modalTitle = "更新玩家状态";
        this.whiteModalForm = this.fb.group({
            gameId: [{ value: user.gameId, disabled: true }],
            userName: [user.userName],
            status: [user.status + "", [Validators.required]],
            playerType: [user.type + "", [Validators.required]],
            disGameId: [true]
        });
        this.whiteVisible = true;
        this.isAddUser = false;
    }
}