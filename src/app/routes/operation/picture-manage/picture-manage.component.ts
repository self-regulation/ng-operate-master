import { Component, OnInit } from '@angular/core';
import { PictureManageServer } from './picture-manage.server';
import { NzMessageService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'picture-manage',
    templateUrl: './picture-manage.component.html',
    providers: [PictureManageServer]
})
export class PictureManageComponent implements OnInit {
    pictureForm: FormGroup;
    addPictureForm: FormGroup;
    pageIndex: any = 1;
    pageSize: any = 10;
    loading = false;
    pageSizeOptions = [10, 20, 30, 40, 50];
    pictureList: any = [];
    total: any = 0;
    addPictureVisible: boolean = false;
    modalLoading: boolean = false;
    modalTitle: string = '新增游戏画质';
    pictureData: any = null; //需修改的游戏画质数据
    isAddPicture: boolean = true; //true:新增画质   false:修改画质
    constructor(public pictureManageServer: PictureManageServer, public message: NzMessageService, public fb: FormBuilder) {
        this.pictureForm = this.fb.group({
            gameId: [null],
            pictureType: [null]
        });
    }

    ngOnInit(): void {
        this.addPictureForm = this.fb.group({
            gameId: [null, [Validators.required]],
            pictureType: [null, [Validators.required]],
            pictureDesc: [null, [Validators.required]],
            needGpu: [null, [Validators.required]],
            needCpu: [null, [Validators.required]],
            needMemory: [null, [Validators.required]],
            needSources: [null, [Validators.required]],
        });
        this.getPictureList();
    }
    getPictureList(param?: any) {
        let params = {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            gameId: param && param.gameId ? param.gameId : '',
            pictureType: param && param.pictureType ? param.pictureType : ''
        };
        this.loading = true;
        this.pictureManageServer.getPictureList(params).subscribe((res: any) => {
            this.loading = false;
            if (res.code == 0 && JSON.stringify(res.data) != '{}') {
                this.pictureList = res.data.list;
                this.total = res.data.total;
            } else {
                this.pictureList = [];
                this.message.create('error', res.message ? res.message : '查询失败!');
            }
        });
    }

    searchData() {
        this.pageIndex = 1;
        this.getPictureList(this.pictureForm.value);
    }

    changePage(event) {
        this.pageIndex = event;
        this.getPictureList();
    }

    changePageSize(event) {
        this.pageSize = event;
        this.getPictureList();
    }
    //删除游戏画质
    deletePicture(pictureId) {
        if (!pictureId) {
            this.message.create('error', '数据有误，删除失败!');
        }
        this.loading = true;
        this.pictureManageServer.deletePicture({ id: pictureId }).subscribe((res: any) => {
            this.loading = false;
            if (res.code == 0) {
                this.message.create('success', res.message ? res.message : '操作成功!');
                this.getPictureList();
            } else {
                this.message.create('error', res.message ? res.message : '操作失败!');
            }
        });
    }

    addPicture() {
        this.addPictureForm = this.fb.group({
            gameId: [null, [Validators.required]],
            pictureType: [null, [Validators.required]],
            pictureDesc: [null, [Validators.required]],
            needGpu: [null, [Validators.required]],
            needCpu: [null, [Validators.required]],
            needMemory: [null, [Validators.required]],
            needSources: [null, [Validators.required]],
        });
        this.addPictureVisible = true;
    }
    //新增游戏画质
    addPictureOk() {
        for (const i in this.addPictureForm.controls) {
            this.addPictureForm.controls[i].markAsDirty();
            this.addPictureForm.controls[i].updateValueAndValidity();
        }
        if (this.addPictureForm.status === "INVALID") {
            console.log(this.addPictureForm);
            this.message.create('warring', '请完整填写数据!');
            return
        }
        console.log(this.addPictureForm.value);
        this.modalLoading = true;
        if (this.isAddPicture) {
            this.pictureManageServer.addPicture(this.addPictureForm.value).subscribe((res: any) => {
                this.modalLoading = false;
                if (res.code == 0) {
                    this.addPictureVisible = false;
                    this.message.create('success', res.message ? res.message : '操作成功!');
                    this.getPictureList();
                } else {
                    this.message.create('error', res.message ? res.message : '操作失败!');
                }
            });
        } else {
            let params = this.addPictureForm.value;
            params['id'] = this.pictureData.id;
            this.pictureManageServer.updatePicture(params).subscribe((res: any) => {
                this.modalLoading = false;
                if (res.code == 0) {
                    this.addPictureVisible = false;
                    this.message.create('success', res.message ? res.message : '操作成功!');
                    this.getPictureList();
                } else {
                    this.message.create('error', res.message ? res.message : '操作失败!');
                }
            });
        }

    }
    //更新游戏画质
    updatePicture(picture) {
        this.pictureData = picture;
        this.modalTitle = '修改游戏画质';
        this.isAddPicture = false;
        this.addPictureVisible = true;
        this.addPictureForm = this.fb.group({
            gameId: [picture.gameId, [Validators.required]],
            pictureType: [picture.pictureType, [Validators.required]],
            pictureDesc: [picture.pictureDesc, [Validators.required]],
            needGpu: [picture.needGpu, [Validators.required]],
            needCpu: [picture.needCpu, [Validators.required]],
            needMemory: [picture.needMemory, [Validators.required]],
            needSources: [picture.needSources, [Validators.required]],
        });

    }

    addPictureCancel() {
        this.addPictureVisible = false;
        this.pictureData = null;
    }
}