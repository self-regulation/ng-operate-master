import { Component, OnInit } from '@angular/core';
import { PictureManageServer } from './picture-manage.server';
import { NzMessageService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { positiveValidator } from '@shared';

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
    pictureTypes: string = '';//画质类型
    allPictureTypes: any = { '1': '最简', '2': '简约', '3': '均衡', '4': '唯美', '5': '高效', '6': '电影', '7': '极致' };
    constructor(public pictureManageServer: PictureManageServer, public message: NzMessageService, public fb: FormBuilder) {
        this.pictureForm = this.fb.group({
            gameId: [null],
            pictureType: [null]
        });
    }

    ngOnInit(): void {
        this.addPictureForm = this.fb.group({
            gameId: [null, [Validators.required, positiveValidator]],
            pictureType: [null, [Validators.required]],
            needGpu: [null, [Validators.required, positiveValidator]],
            needCpu: [null, [Validators.required, positiveValidator]],
            needMemory: [null, [Validators.required, positiveValidator]],
            needSources: [null, [Validators.required, positiveValidator]],
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
            gameId: [null, [Validators.required, positiveValidator]],
            pictureType: [null, [Validators.required]],
            needGpu: [null, [Validators.required, positiveValidator]],
            needCpu: [null, [Validators.required, positiveValidator]],
            needMemory: [null, [Validators.required, positiveValidator]],
            needSources: [null, [Validators.required, positiveValidator]],
        });
        this.addPictureVisible = true;
        this.isAddPicture = true;
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
        console.log(this.pictureTypes);
        this.addPictureForm = this.fb.group({
            gameId: [picture.gameId, [Validators.required, positiveValidator]],
            pictureType: [picture.pictureType, [Validators.required]],
            needGpu: [picture.needGpu, [Validators.required, positiveValidator]],
            needCpu: [picture.needCpu, [Validators.required, positiveValidator]],
            needMemory: [picture.needMemory, [Validators.required, positiveValidator]],
            needSources: [picture.needSources, [Validators.required, positiveValidator]],
        });
        this.pictureTypes = picture.pictureType + '';

    }

    addPictureCancel() {
        this.addPictureVisible = false;
        this.pictureData = null;
        this.pictureTypes = '';
    }

    formatePictureType(type) {
        return this.allPictureTypes[type];
    }
}