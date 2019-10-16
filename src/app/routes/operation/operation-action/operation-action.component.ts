import { Component, OnInit, ViewChild } from '@angular/core';
import { OperationService } from '../operation.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { DynamicFormQuestionComponent } from '@core/components/dynamic-forms/dynamic-form-question.component';
import { FormControlService } from '@core/components/dynamic-forms/form-control.service';

@Component({
    selector: 'operation-action',
    templateUrl: './operation-action.component.html',
    styleUrls: ['./operation-action.component.less'],
    providers: [FormControlService, OperationService]
})
export class OperationActionComponent implements OnInit {
    @ViewChild("editContentForm", { static: false }) editContentForm: DynamicFormQuestionComponent;
    operationListLoading: boolean = true;
    logForm: FormGroup;
    operationLoglist: any = [];

    // operationForm: FormGroup;
    importForm: FormGroup;
    operationList: any = [];
    total: any = 0;
    pageIndex: any = 1;
    pageSize: any = 10;
    loading = false;
    pageSizeOptions = [10, 20, 30, 40, 50];


    operationTitle: any = ''; //运维内容标题
    editContentVisible: boolean = false;
    configVo: any = '';

    preStartForm: FormGroup;
    bitrateCustomize: boolean = false;//自定义 推流码率
    serverTypeCustomize: boolean = false;//自定义 serverType
    // encodecCustomize: boolean = false; //自定义 视频编解码器
    videoFpsCustomize: boolean = false;//自定义 视频帧率
    // protocolCustomize: boolean = false;//自定义 control-protocol-tcp
    serverMap: Array<any> = []; // 可用地址

    updateServerVisible: boolean = false; //更改服务器分类
    updateServerForm: FormGroup;
    newServerTypeCustomize: boolean = false;//自定义 newServerType
    oldServerType: any = "";
    constructor(
        private operationService: OperationService,
        private fb: FormBuilder,
        private message: NzMessageService,
        private qcs: FormControlService) {

    }
    ngOnInit(): void {

        this.logForm = this.fb.group({
            operationKey: [null],
        });

        //更改服务器分类
        this.updateServerForm = this.fb.group({
            serverName: [null, [Validators.required]],
            oldServerType: [null],
            newServerType: [null, [Validators.required]],
        });

        //游戏预启动
        this.preStartForm = this.fb.group({
            user: [null, [Validators.required]],
            pictureSet: ['7', [Validators.required]],
            bitrate: ['2', [Validators.required]],
            videoResolutionWidth: [null, [Validators.required]],
            videoResolutionHeight: [null, [Validators.required]],
            screenResolutionWidth: [null, [Validators.required]],
            screenResolutionHeight: [null, [Validators.required]],

            videoEncodec: [null, [Validators.required]],
            videoFps: [null, [Validators.required]],
            serverType: ["6", [Validators.required]],
            serverIp: [null],
            protocol: ["1", [Validators.required]],
            controlTcp: ["Evpp", [Validators.required]],
        });

        this.getOperationManagerList();
        this.getOperationLoglist();
    }

    getOperationManagerList() {
        this.operationService.getOperationManagerList().subscribe((res: any) => {
            this.operationListLoading = false;
            if (res.code == 0 && res.data && res.data.list) {
                this.operationList = res.data.list;
                this.total = res.data.total;
            } else {
                this.message.create('error', res.message ? res.message : '查询失败!');
            }
        });
    }

    getOperationLoglist(operationKey?: any) {
        let params = {
            pageNum: this.pageIndex,
            pageSize: this.pageSize
        }
        if (operationKey) {
            params["operationKey"] = operationKey;
        }
        this.loading = true;
        this.operationService.getOperationLoglist(params).subscribe((res: any) => {
            this.loading = false;
            if (res.code == 0) {
                this.operationLoglist = res.data.list;
                this.total = res.data.total;
            } else {
                this.message.create('error', res.message ? res.message : '查询失败!');
            }
        });
    }

    rearchLog() {
        this.getOperationLoglist(this.logForm.value.operationKey);
    }

    operationEvent(item) {

        if (item && item.operationKey) {
            this.availableAddress();
            if (item.operationKey == 'prepareStartGame') {
                this.operationTitle = item.operationName;
                this.editContentVisible = true;
                this.configVo = item;

                this.preStartForm = this.fb.group({
                    user: [null, [Validators.required]],
                    pictureSet: ['7', [Validators.required]],
                    bitrate: ['2', [Validators.required]],
                    videoResolutionWidth: [null, [Validators.required]],
                    videoResolutionHeight: [null, [Validators.required]],
                    screenResolutionWidth: [null, [Validators.required]],
                    screenResolutionHeight: [null, [Validators.required]],

                    videoEncodec: [null, [Validators.required]],
                    videoFps: [null, [Validators.required]],
                    serverType: ["6", [Validators.required]],
                    serverIp: [null],
                    protocol: ["1", [Validators.required]],
                    controlTcp: ["Evpp", [Validators.required]],
                });

                this.bitrateCustomize = false;
                this.serverTypeCustomize = false;
            } else if (item.operationKey == 'updateServerType') {
                this.updateServerForm = this.fb.group({
                    serverName: [null, [Validators.required]],
                    oldServerType: [null],
                    newServerType: [null, [Validators.required]],
                });

                this.operationTitle = item.operationName;
                this.updateServerVisible = true;
                this.configVo = item;

                this.newServerTypeCustomize = false;
            }

        } else {
            this.message.create('error', '数据有误!');
        }

    }

    editContentCancel() {
        this.editContentVisible = false;
    }

    changePage(event) {
        this.pageIndex = event;
        this.getOperationLoglist();
    }

    changePageSize(event) {
        this.pageSize = event;
        this.getOperationLoglist();
    }

    //修改推流码率
    changeBitrate(event) {
        if (event == 'customize') {
            this.preStartForm.addControl("bitrateCustomize", new FormControl(null, Validators.required));
            this.bitrateCustomize = true;
        } else {
            this.bitrateCustomize = false;
            this.preStartForm.removeControl("bitrateCustomize");
        }
    }

    //修改 视频帧率
    changeVideoFps(event) {
        if (event == 'customize') {
            this.preStartForm.addControl("videoFpsCustomize", new FormControl(null, Validators.required));
            this.videoFpsCustomize = true;
        } else {
            this.videoFpsCustomize = false;
            this.preStartForm.removeControl("videoFpsCustomize");
        }
    }

    //修改 视频帧率
    changeServerType(event) {
        if (event == 'customize') {
            this.preStartForm.addControl("serverTypeCustomize", new FormControl(null, Validators.required));
            this.serverTypeCustomize = true;
        } else {
            this.serverTypeCustomize = false;
            this.preStartForm.removeControl("serverTypeCustomize");
        }
    }
    //获取可用地址 (nzOpenChange)="availableAddress($event)"
    availableAddress() {
        if (this.serverMap.length <= 0) {
            this.operationService.getGameServerMap().subscribe((res: any) => {
                if (res.code == 0) {
                    for (let op in res.data) {
                        let opItem = {};
                        opItem['label'] = op;
                        opItem['value'] = res.data[op];
                        this.serverMap.push(opItem);
                    }
                    console.log(this.serverMap);
                }
            });
        }
    }
    //修改可用地址
    changeServerIp(event) {
        this.preStartForm.value.serverType = event.split(',')[1];
        this.preStartForm.value.serverIp = event.split(',')[0];
    }

    //命令执行（游戏预启动、更改服务器分类）
    executeOperationManager() {
        for (const i in this.preStartForm.controls) {
            this.preStartForm.controls[i].markAsDirty();
            this.preStartForm.controls[i].updateValueAndValidity();
        }
        if (this.preStartForm.status === "INVALID") {
            return
        }
        let operationParam = {};

        for (let operat in this.preStartForm.value) {
            switch (operat) {
                case 'bitrate':
                    if (this.preStartForm.value[operat] == "customize") {
                        operationParam['bitrate'] = this.preStartForm.value['bitrateCustomize'];
                    } else {
                        operationParam['bitrate'] = this.preStartForm.value[operat];
                    }
                    break;
                case 'videoFps':
                    if (this.preStartForm.value[operat] == "customize") {
                        operationParam['videoFps'] = this.preStartForm.value['videoFpsCustomize'];
                    } else {
                        operationParam['videoFps'] = this.preStartForm.value[operat];
                    }
                    break;
                case 'serverType':
                    if (!this.preStartForm.value["serverIp"]) {
                        if (this.preStartForm.value[operat] == "customize") {
                            operationParam['serverType'] = this.preStartForm.value['serverTypeCustomize'];
                        } else {
                            operationParam['serverType'] = this.preStartForm.value[operat];
                        }
                    } else {
                        console.log(this.preStartForm.value.serverIp);
                        operationParam['serverType'] = this.preStartForm.value.serverIp.split(',')[1];
                    }

                    break;
                case 'bitrateCustomize': //自定义推流码率
                    operationParam[operat] = this.preStartForm.value[operat];
                    break;

                case 'videoFpsCustomize'://自定义视频帧率
                    operationParam[operat] = this.preStartForm.value[operat];
                    break;
                case 'serverTypeCustomize'://自定义 Server Type
                    operationParam[operat] = this.preStartForm.value[operat];
                    break;
                case 'serverIp':
                    operationParam[operat] = this.preStartForm.value.serverIp.split(',')[0];
                    break;

                default:
                    if (this.preStartForm.value[operat]) {
                        operationParam[operat] = this.preStartForm.value[operat];
                    }

                    break;

            }
        }
        console.log(operationParam);
        let params = {
            operationKey: this.configVo.operationKey,
            param: JSON.stringify(operationParam)
        };

        this.operationService.executeOperationManager(params).subscribe((res: any) => {
            if (res.code == 0) {
                this.editContentVisible = false;
                this.message.create('success', res.message ? res.message : '操作成功!');
                this.getOperationLoglist();
            } else {
                this.message.create('error', res.message ? res.message : '操作失败!');
            }
        });
    }

    //更改服务器分类
    changeNewServerType(event) {
        if (event == 'customize') {
            this.updateServerForm.addControl("newServerTypeCustomize", new FormControl(null, Validators.required));
            this.newServerTypeCustomize = true;
        } else {
            this.newServerTypeCustomize = false;
            this.updateServerForm.removeControl("newServerTypeCustomize");
        }
    }
    //更改服务器
    updateServerOk() {
        for (const i in this.updateServerForm.controls) {
            this.updateServerForm.controls[i].markAsDirty();
            this.updateServerForm.controls[i].updateValueAndValidity();
        }
        if (this.updateServerForm.status === "INVALID") {
            this.message.create('error', '请填写必填信息!');
            return
        }

        let updateServerParam = {
            serverName: this.updateServerForm.value.serverName.split(',')[0],
            oldServerType: this.updateServerForm.value.serverName.split(',')[1],
            newServerType: this.updateServerForm.value.newServerType,
            newServerTypeCustomize: this.updateServerForm.value.newServerType
        };
        if (this.updateServerForm.value.newServerType == 'customize') {
            updateServerParam.newServerType = this.updateServerForm.value.newServerTypeCustomize;
        }
        let params = {
            operationKey: this.configVo.operationKey,
            param: JSON.stringify(updateServerParam)
        };

        this.operationService.executeOperationManager(params).subscribe((res: any) => {

            if (res.code == 0) {
                this.updateServerVisible = false;
                this.message.create('success', res.message ? res.message : '操作成功!');
                this.getOperationLoglist();
            } else {
                this.message.create('error', res.message ? res.message : '操作失败!');
            }
        });
    }

    updateServerCancel() {
        this.updateServerVisible = false;
    }

    changeServerName(event: any) {
        this.updateServerForm.value.oldServerType = event.split(',')[1];

        this.oldServerType = event.split(',')[1];
    }
    //复制操作
    copyOperation(item) {
        this.configVo = item;
        let paramValue = JSON.parse(item.param);
        if (typeof paramValue == 'string') {
            paramValue = JSON.parse(paramValue);
        }
        if (item.operationKey == "updateServerType") {
            this.serverMap = [];
            this.operationService.getGameServerMap().subscribe((res: any) => {
                if (res.code == 0) {
                    let serverIp = null;
                    for (let op in res.data) {
                        let opItem = {};
                        opItem['label'] = op;
                        opItem['value'] = res.data[op];
                        this.serverMap.push(opItem);
                        if (paramValue.serverIp == op) {
                            serverIp = op + ',' + res.data[op];
                        }
                    }

                    this.updateServerForm = this.fb.group({
                        serverName: [serverIp ? serverIp : paramValue.serverName, [Validators.required]],
                        oldServerType: [paramValue.oldServerType],
                        newServerType: [paramValue.newServerType, [Validators.required]],
                    });

                    if (paramValue.newServerTypeCustomize) {
                        this.updateServerForm.value.newServerTypeCustomize = paramValue.newServerTypeCustomize;
                        this.updateServerForm.value.newServerType = "customize";
                    }

                    this.updateServerVisible = true;
                    this.operationTitle = "更改服务器分类";
                }
            });

        } else if (item.operationKey == "prepareStartGame") {
            this.serverMap = [];
            this.operationService.getGameServerMap().subscribe((res: any) => {
                if (res.code == 0) {
                    let serverIp = null;
                    for (let op in res.data) {
                        let opItem = {};
                        opItem['label'] = op;
                        opItem['value'] = res.data[op];
                        this.serverMap.push(opItem);
                        if (paramValue.serverIp == op) {
                            serverIp = op + ',' + res.data[op];
                        }
                    }
                    this.preStartForm = this.fb.group({
                        user: [paramValue.user, [Validators.required]],
                        pictureSet: [paramValue.pictureSet, [Validators.required]],
                        bitrate: [paramValue.bitrate, [Validators.required]],
                        videoResolutionWidth: [paramValue.videoResolutionWidth, [Validators.required]],
                        videoResolutionHeight: [paramValue.videoResolutionHeight, [Validators.required]],
                        screenResolutionWidth: [paramValue.screenResolutionWidth, [Validators.required]],
                        screenResolutionHeight: [paramValue.screenResolutionHeight, [Validators.required]],
                        videoEncodec: [paramValue.videoEncodec, [Validators.required]],
                        videoFps: [paramValue.videoFps, [Validators.required]],
                        serverType: [paramValue.serverType, [Validators.required]],
                        serverIp: [serverIp ? serverIp : paramValue.serverIp],
                        protocol: [paramValue.protocol, [Validators.required]],
                        controlTcp: [paramValue.controlTcp, [Validators.required]],
                    });

                    if (paramValue.bitrateCustomize) {
                        this.preStartForm.value.bitrateCustomize = paramValue.bitrateCustomize;
                        this.preStartForm.value.bitrate = "customize";
                    }
                    if (paramValue.videoFpsCustomize) {
                        this.preStartForm.value.videoFpsCustomize = paramValue.videoFpsCustomize;
                        this.preStartForm.value.videoFps = "customize";
                    }
                    if (paramValue.serverTypeCustomize) {
                        this.preStartForm.value.serverTypeCustomize = paramValue.serverTypeCustomize;
                        this.preStartForm.value.serverType = "customize";
                    }
                    this.editContentVisible = true;
                    this.operationTitle = "游戏预启动";
                }
            });
        }

    }

    stopOperation(item) {

        let serverInfo = JSON.parse(item.param);
        if (typeof serverInfo == 'string') {
            serverInfo = JSON.parse(serverInfo);
        }
        if (!serverInfo.user) {
            this.message.create('error', '数据有误!');
            return;
        }
        let params = {
            user: serverInfo.user
        }

        this.operationService.gamePrepareStop(params).subscribe((res: any) => {
            if (res.code == 0) {
                this.message.create('success', res.message ? res.message : '操作成功!');
                this.getOperationLoglist();
            } else {
                this.message.create('error', res.message ? res.message : '操作失败!');
            }
        });
    }


}