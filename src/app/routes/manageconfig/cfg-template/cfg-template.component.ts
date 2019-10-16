import { OnInit, Component, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { FormControlService } from '@core/components/dynamic-forms/form-control.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { CfgTemplateSercive } from './cfg-template.service';
import { DynamicFormQuestionComponent } from '@core/components/dynamic-forms/dynamic-form-question.component';
@Component({
    selector: "cfg-template",
    templateUrl: "./cfg-template.component.html",
    providers: [FormControlService, CfgTemplateSercive]
})
export class CfgTemplateComponent implements OnInit {
    @ViewChild("editContentForm", { static: false }) editContentForm: DynamicFormQuestionComponent;

    total: any = 0;
    pageIndex: any = 1;
    pageSize: any = 10;
    loading = false;
    pageSizeOptions = [10, 20, 30, 40, 50];

    cfgForm: FormGroup;
    importForm: FormGroup;
    // configForm: FormGroup;
    newConfigForm: FormGroup;   //新增配置表单（描述配置）

    configTitle: any = '新增配置';
    keyDisabled: boolean = false;

    pubStatus: any = { 0: '未发布', 1: '已发布' };
    importVisible: boolean = false;
    addVisible: boolean = false;
    // addConfigVisible: boolean = false;
    editContentVisible: boolean = false;
    lookContentVisible: boolean = false;
    panels: any = [];
    newPanels: any = [];

    newConfigList: any = [];
    controlType: any = "";


    gameManagerList: any = [];
    gameManagerVo: any = null;
    editGameItem: any = null;

    addPanelsVisible: boolean = false; //添加配置面板
    addNewPanelsForm: FormGroup;
    constructor(
        private qcs: FormControlService,
        private fb: FormBuilder,
        private cfgTemplateSercive: CfgTemplateSercive,
        private message: NzMessageService) {

    }
    ngOnInit(): void {
        this.cfgForm = this.fb.group({
            key: [null],
        });

        this.importForm = this.fb.group({
            itemKey: [null, [Validators.required]],
            itemName: [null],
            // desc: [null],
            paramTemplet: [null, [Validators.required]]
        });

        //手动新增配置
        this.newConfigForm = this.fb.group({
            itemKey: [null, [Validators.required]],
            itemName: [null],
        });

        //新增配置面板
        this.addNewPanelsForm = this.fb.group({
            key: [null, [Validators.required]],
            name: [null, [Validators.required]],
        });

        this.getGameManagerList();
    }
    ngAfterViewInit(): void {

    }
    //导入配置
    importConfig() {
        this.importForm = this.fb.group({
            itemKey: [null, [Validators.required]],
            itemName: [null],
            paramTemplet: [null, [Validators.required]]
        });
        this.importVisible = true;
    }

    importCancel() {
        this.panels = [];
        this.importForm = this.fb.group({
            itemKey: [null, [Validators.required]],
            itemName: [null],
            paramTemplet: [null, [Validators.required]]
        });
        this.importVisible = false;
        this.addVisible = false;
    }
    //生成模板
    importOk() {
        for (const i in this.importForm.controls) {
            this.importForm.controls[i].markAsDirty();
            this.importForm.controls[i].updateValueAndValidity();
        }

        if (this.importForm.status === "INVALID") {
            this.message.create('error', '请填写必填项!');
            return
        }
        let paramTemplet = JSON.parse(this.importForm.value.paramTemplet);
        if (paramTemplet.panels) {
            this.panels = this.qcs.produceFormData(paramTemplet.panels);
        } else {
            this.message.create('error', 'JSON格式有误!');
        }
    }
    //提交导入的模板数据
    submitConfig() {
        for (const i in this.importForm.controls) {
            this.importForm.controls[i].markAsDirty();
            this.importForm.controls[i].updateValueAndValidity();
        }

        if (this.importForm.status === "INVALID") {
            this.message.create('error', '请填写必填项!');
            return;
        }
        if (this.panels.length <= 0) {
            this.message.create('error', '请生成模板，检查JSON格式合法性!');
            return;
        }
        this.cfgTemplateSercive.addConfigItem(this.importForm.value).subscribe((res: any) => {
            if (res.code === 0) {
                this.message.create('success', res.message ? res.message : '操作成功!');
                this.importVisible = false;
                this.getGameManagerList();
            } else {
                this.message.create('error', res.message ? res.message : '操作失败!');
            }
        });

    }
    //提交手动新增的配置
    addNewConfig() {
        let panels = this.editContentForm.getParamTemplet();
        let isValid = true;
        for (const i in this.newConfigForm.controls) {
            this.newConfigForm.controls[i].markAsDirty();
            this.newConfigForm.controls[i].updateValueAndValidity();
        }

        if (this.newConfigForm.status === "INVALID") {
            this.message.create('warning', '填写必填项!');
            return;
        }
        let params = {
            itemKey: this.newConfigForm.value.itemKey,
            itemName: this.newConfigForm.value.itemName,
        }
        if (panels.length <= 0) {
            isValid = false;
        } else {
            panels.forEach((item: any) => {
                if (!item.questions || item.questions.length <= 0) {
                    isValid = false;
                }
            });
        }
        if (!isValid) {
            this.message.create('warning', '面板配置项不能为空!');
            return;
        }
        params['paramTemplet'] = {
            "panels": panels
        };
        if (this.configTitle === "编辑配置") {
            this.cfgTemplateSercive.updateGameManager(params).subscribe((res: any) => {
                if (res.code === 0) {
                    this.message.create('success', res.message ? res.message : '操作成功!');
                    this.addVisible = false;
                    this.getGameManagerList();
                } else {
                    this.message.create('error', res.message ? res.message : '操作失败!');
                }
            });
        } else {
            this.cfgTemplateSercive.addConfigItem(params).subscribe((res: any) => {
                if (res.code === 0) {
                    this.message.create('success', res.message ? res.message : '操作成功!');
                    this.addVisible = false;
                    this.getGameManagerList();
                } else {
                    this.message.create('error', res.message ? res.message : '操作失败!');
                }
            });
        }

    }
    //新增配置按钮
    addConfigModal() {
        this.newConfigForm = this.fb.group({
            itemKey: [null, [Validators.required]],
            itemName: [null],
            // desc: [null],
        });
        this.addVisible = true;
        this.keyDisabled = false;
        this.configTitle = '新增配置';
    }
    //新增配置面板
    addPanelsConfig() {
        this.addNewPanelsForm = this.fb.group({
            key: [null, [Validators.required]],
            name: [null, [Validators.required]],
        });
        this.addPanelsVisible = true;

    }
    //确认添加新增面板
    addPanelsOk() {
        for (const i in this.addNewPanelsForm.controls) {
            this.addNewPanelsForm.controls[i].markAsDirty();
            this.addNewPanelsForm.controls[i].updateValueAndValidity();
        }

        if (this.addNewPanelsForm.status === "INVALID") {
            this.message.create('warning', '请填写必填项!');
            return;
        }
        let repeatList = this.newPanels.filter((panel: any) => {
            return panel.key == this.addNewPanelsForm.value.key
        });
        if (repeatList && repeatList.length > 0) {
            this.message.create('warning', '配置面板Key已重复，请修改!');
            return;
        }
        this.newPanels.push({
            "key": this.addNewPanelsForm.value.key,
            "name": this.addNewPanelsForm.value.name,
            "form": null,
            "questions": []
        })
        this.addPanelsVisible = false;
    }

    addPanelsCancel() {
        this.addPanelsVisible = false;
    }

    //配置搜索
    rearchManager() {
        let params = {
            itemKey: this.cfgForm.value.key
        }

        this.getGameManagerList(params);
    }

    //查询列表数据
    getGameManagerList(params?: any) {
        this.cfgTemplateSercive.getGameManagerList(params).subscribe((res: any) => {
            if (res.code == 0 && res.data && res.data.list) {
                this.gameManagerList = res.data.list;
                this.total = res.data.total;
            } else {
                this.message.create('error', res.message ? res.message : '查询失败!');
            }
        });
    }

    //编辑配置项面板内容
    updateGameManager(game, isEdit?: any) {
        let paramMap = JSON.parse(game.paramMap);
        let paramTemplet = JSON.parse(game.paramTemplet);
        if (typeof paramMap == "string") {
            paramMap = JSON.parse(paramMap);
        }
        if (typeof paramTemplet == "string") {
            paramTemplet = JSON.parse(paramTemplet);
        }
        if (paramMap) {
            paramTemplet.panels.forEach((panel: any, pIndex) => {
                panel.questions.forEach((question: any, qIndex) => {
                    for (let mapitem in paramMap[panel.key]) {
                        if (question.key == mapitem) {
                            if (question.controlType == "checkbox") {
                                let keyValue = paramMap[panel.key][question.key];
                                let binary = null, checkList = [];
                                if (keyValue) {
                                    binary = this.decimal(keyValue);
                                    checkList = (binary + '').split('').reverse();
                                    if (checkList.length > 0) {
                                        checkList.forEach((item: any, cd) => {
                                            if (item == "1") {
                                                paramTemplet.panels[pIndex].questions[qIndex].options[cd].checked = true;
                                            } else {
                                                paramTemplet.panels[pIndex].questions[qIndex].options[cd].checked = false;
                                            }
                                        });
                                    }
                                } else {
                                    paramTemplet.panels[pIndex].questions[qIndex].options.forEach((item: any, cd) => {
                                        paramTemplet.panels[pIndex].questions[qIndex].options[cd].checked = false;
                                    });
                                }

                            } else {
                                paramTemplet.panels[pIndex].questions[qIndex].value = paramMap[panel.key][mapitem];
                            }

                        }
                    }
                });
            });
        }

        if (isEdit) {
            this.editContentVisible = true;
        } else {
            this.lookContentVisible = true;
        }

        this.gameManagerVo = this.qcs.produceFormData(paramTemplet.panels);
        this.editGameItem = game;
    }

    formatStatus(status) {

        return status != 'undefined' ? this.pubStatus[status] : '--';
    }

    //提交
    editContentOk(editContentForm: any) {
        let paramMap = {};
        if (editContentForm && editContentForm.panels) {
            editContentForm.panels.forEach((panel: any) => {
                let paramItem = {};
                for (let item in panel.form.value) {
                    paramItem[item] = panel.form.value[item];
                }
                // panel.questions.forEach((question: any) => {
                //     if (question.controlType == "checkbox") {
                //         paramItem[question.key] = this.qcs.checkboxToBinary(question.options);
                //     } else {
                //         paramItem[question.key] = question.value;
                //     }
                // });
                paramMap[panel.key] = paramItem;
            });
        } else {
            this.message.create('error', '获取配置数据失败!');
        }
        let params = {
            itemKey: this.editGameItem.itemKey,
            paramMap: JSON.stringify(paramMap)
        };
        this.cfgTemplateSercive.updateGameManager(params).subscribe((res: any) => {
            if (res.code == 0) {
                this.editContentVisible = false;
                this.getGameManagerList();
            } else {
                this.message.create('error', res.message ? res.message : '操作失败!');
            }
        });

    }

    editContentCancel() {
        this.editContentVisible = false;
        this.lookContentVisible = false;
    }
    //删除
    deleteGameManager(id, itemKey) {
        let params = {
            id: id,
            itemKey: itemKey
        };
        this.cfgTemplateSercive.deleteGameManager(params).subscribe((res: any) => {
            if (res.code == 0) {
                this.message.create('success', res.message ? res.message : '操作成功!');
                this.getGameManagerList();
            } else {
                this.message.create('error', res.message ? res.message : '操作失败!');
            }
        });
    }
    //编辑模板
    editTemplate(itemData) {
        if (itemData.paramTemplet) {
            this.configTitle = '编辑配置';
            this.addVisible = true;
            this.keyDisabled = true;
            this.newConfigForm = this.fb.group({
                itemKey: [itemData.itemKey, [Validators.required]],
                itemName: [itemData.itemName],
            });
            let paramTemplet = JSON.parse(itemData.paramTemplet);
            if (typeof paramTemplet === 'string') {
                paramTemplet = JSON.parse(paramTemplet);
            }
            this.newConfigList = paramTemplet.panels;
            this.newPanels = this.qcs.produceFormData(paramTemplet.panels);
        }
    }
    //复制模板
    copyTemplate(configData: any) {
        if (!configData.paramTemplet || JSON.parse(configData.paramTemplet) == '{}') {
            this.message.create('error', '数据有误，操作失败!');
            return;
        }
        this.importForm = this.fb.group({
            itemKey: [null, [Validators.required]],
            itemName: [null],
            paramTemplet: [configData.paramTemplet, [Validators.required]]
        });
        this.importVisible = true;
    }
    changePage(event) {
        this.pageIndex = event;
        this.getGameManagerList();
    }

    changePageSize(event) {
        this.pageSize = event;
        this.getGameManagerList();
    }

    decimal(num) {
        let b = 0, i = 0, q, r;
        do {
            q = Math.floor(num / 2);
            r = num - q * 2;
            b += r * Math.pow(10, i);
            i++;
            num = q;
        } while (q !== 0);
        return b;
    }
}