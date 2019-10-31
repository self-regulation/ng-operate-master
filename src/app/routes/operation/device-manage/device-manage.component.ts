import { Component, OnInit } from '@angular/core';
import { DeviceManageServer } from './device-manage.server';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { positiveValidator } from '@shared';

@Component({
    selector: 'device-manage',
    templateUrl: './device-manage.component.html',
    providers: [DeviceManageServer]
})
export class DeviceManageComponent implements OnInit {
    deviceForm: FormGroup;
    addDeviceForm: FormGroup;
    pageIndex: any = 1;
    pageSize: any = 10;
    loading = false;
    pageSizeOptions = [10, 20, 30, 40, 50];
    deviceList: any = [];
    total: any = 0;
    addDeviceVisible: boolean = false;
    modalLoading: boolean = false;
    modalTitle: string = '新增设备';
    deviceData: any = null; //需修改的游戏画质数据
    isAddDevice: boolean = true; //true:新增设备   false:修改设备
    selectStatus: string = '';
    constructor(private deviceManageServer: DeviceManageServer, private message: NzMessageService, public fb: FormBuilder) {
        this.deviceForm = this.fb.group({
            gameId: [null],
            deviceType: [null]
        });
    }

    ngOnInit(): void {
        this.addDeviceForm = this.fb.group({
            gameId: [null, [Validators.required, positiveValidator]],
            deviceType: [null, [Validators.required]],
            deviceModel: [null],
            resource: [null, [Validators.required, positiveValidator]],
            status: [null, [Validators.required]],
        });
        this.getDeviceList();
    }
    getDeviceList(param?: any) {
        let params = {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            gameId: param && param.gameId ? param.gameId : '',
            deviceType: param && param.deviceType ? param.deviceType : ''
        };
        this.deviceManageServer.getDeviceList(params).subscribe((res: any) => {
            this.loading = false;
            if (res.code == 0 && JSON.stringify(res.data) != '{}') {
                this.deviceList = res.data.list;
                this.total = res.data.total;
            } else {
                this.deviceList = [];
                this.message.create('error', res.message ? res.message : '查询失败!');
            }
        });
    }

    deleteDevice(deviceId) {
        if (!deviceId) {
            this.message.create('error', '数据有误，删除失败!');
        }
        this.loading = true;
        this.deviceManageServer.deleteDevice({ id: deviceId }).subscribe((res: any) => {
            this.loading = false;
            if (res.code == 0) {
                this.message.create('success', res.message ? res.message : '操作成功!');
                this.getDeviceList();
            } else {
                this.message.create('error', res.message ? res.message : '操作失败!');
            }
        });
    }

    addDevice() {
        this.addDeviceForm = this.fb.group({
            gameId: [null, [Validators.required, positiveValidator]],
            deviceType: [null, [Validators.required]],
            deviceModel: [null],
            resource: [null, [Validators.required, positiveValidator]],
            status: [null, [Validators.required]],
        });
        this.addDeviceVisible = true;
    }

    //更新设备信息
    updateDevice(device) {
        this.deviceData = device;
        this.modalTitle = '修改设备';
        this.isAddDevice = false;
        this.addDeviceVisible = true;
        console.log(device);
        this.addDeviceForm = this.fb.group({
            gameId: [device.gameId, [Validators.required, positiveValidator]],
            deviceType: [device.deviceType, [Validators.required]],
            deviceModel: [device.deviceModel],
            resource: [device.resource, [Validators.required, positiveValidator]],
            status: [device.status, [Validators.required]],
        });
        this.selectStatus = device.status + '';
    }
    addDeviceCancel() {
        this.addDeviceVisible = false;
        this.deviceData = null;
        this.selectStatus = '';
    }

    addDeviceOk() {
        for (const i in this.addDeviceForm.controls) {
            this.addDeviceForm.controls[i].markAsDirty();
            this.addDeviceForm.controls[i].updateValueAndValidity();
        }
        if (this.addDeviceForm.status === "INVALID") {
            console.log(this.addDeviceForm);
            this.message.create('warring', '请完整填写数据!');
            return
        }
        console.log(this.addDeviceForm.value);
        this.modalLoading = true;
        if (this.isAddDevice) {
            this.deviceManageServer.addDevice(this.addDeviceForm.value).subscribe((res: any) => {
                this.modalLoading = false;
                if (res.code == 0) {
                    this.addDeviceVisible = false;
                    this.message.create('success', res.message ? res.message : '操作成功!');
                    this.getDeviceList();
                } else {
                    this.message.create('error', res.message ? res.message : '操作失败!');
                }
            });
        } else {
            let params = this.addDeviceForm.value;
            params['id'] = this.deviceData.id;
            this.deviceManageServer.updateDevice(params).subscribe((res: any) => {
                this.modalLoading = false;
                if (res.code == 0) {
                    this.addDeviceVisible = false;
                    this.message.create('success', res.message ? res.message : '操作成功!');
                    this.getDeviceList();
                } else {
                    this.message.create('error', res.message ? res.message : '操作失败!');
                }
            });
        }

    }

    changePage(event) {
        this.pageIndex = event;
        this.getDeviceList();
    }

    changePageSize(event) {
        this.pageSize = event;
        this.getDeviceList();
    }

    searchData() {
        this.pageIndex = 1;
        this.getDeviceList(this.deviceForm.value);
    }

}