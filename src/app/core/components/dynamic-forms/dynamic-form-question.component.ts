import { Component, Input, SimpleChanges, Output, EventEmitter, NgZone, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { FormControlService } from './form-control.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-question',
    templateUrl: './dynamic-form-question.component.html',
    styleUrls: ['./dynamic-form-question.component.less']
})
export class DynamicFormQuestionComponent {
    @Input() panels: any = [];
    @Input() form: FormGroup;
    @Input() isDelete: boolean = false;
    @Input() disabled: boolean = false;
    // @Output() voted = new EventEmitter<any>();


    addConfigVisible: boolean = false;
    configForm: FormGroup;
    //添加项里面的内容
    listOfControl: Array<{ id: number; label: string; value: string }> = [];
    optionFormGroup: FormGroup;
    controlType: any = "";

    //给指定的面板添加元素
    panel: any = null;
    constructor(private qcs: FormControlService, public ngZone: NgZone, private fb: FormBuilder, private message: NzMessageService) {

    }
    ngOnInit(): void {
        this.configForm = this.fb.group({
            key: [null, [Validators.required]],
            controlType: ['input', [Validators.required]],
            des: [null],
            label: [null, [Validators.required]],
            value: [null],
        });
        this.optionFormGroup = this.fb.group({});
    }

    ngAfterViewInit() {

    }

    ngOnChanges(changes: SimpleChanges) {
        this.panels = changes.panels.currentValue;
        console.log('模板值变化：');
        console.log(this.panels);
    }

    addField(e: MouseEvent, pIndex, sIndex) {
        if (e) {
            e.preventDefault();
        }
        this.panels[pIndex].questions[sIndex].value.push('');
        console.log(this.panels.form);
        console.log(this.form);
    }

    removeField(e: MouseEvent, pIndex, sIndex, vIndex): void {
        if (e) {
            e.preventDefault();
        }
        if (this.panels[pIndex].questions[sIndex].value && this.panels[pIndex].questions[sIndex].value.length > 1) {
            this.panels[pIndex].questions[sIndex].value.splice(vIndex, 1);
        }
    }

    getInput(e: any, pIndex, sIndex, vIndex) {
        this.panels[pIndex].questions[sIndex].value[vIndex] = e.target.value;
    }

    removeItem(pIndex: any, qIndex: any) {
        if (this.panels[pIndex].questions.length <= 1) {
            this.message.create('warning', '面板中至少有一项配置!');
            return;
        }
        this.panels[pIndex].questions.splice(qIndex, 1);
        // this.voted.emit(item);
    }
    //获取面板模板
    getParamTemplet(): any {
        return this.panels;
    }

    changeCheckbox(key, pIndex, index, checked) {
        this.panels[pIndex].questions.forEach((question: any, k) => {
            if (question.key == key) {
                this.panels[pIndex].questions[k].options[index].checked = checked;
                this.panels[pIndex].form.value[key] = this.checkboxToBinary(this.panels[pIndex].questions[k].options);
            }
        });
    }

    checkboxToBinary(checkbox: any) {
        let sum = 0;
        checkbox.forEach((item: any, index) => {
            if (item.checked && item.checked == true) {
                let a = 1;
                sum += a << index;
            }
        });
        return sum + '';
    }

    //删除配置模板
    deletePanelsConfig(panel: any, pIndex: any) {
        this.panels.splice(pIndex, 1);
    }


    addConfig(panel: any, pIndex: any) {
        this.panel = panel;
        this.addConfigVisible = true;
        this.configForm = this.fb.group({
            key: [null, [Validators.required]],
            controlType: ['input', [Validators.required]],
            des: [null],
            label: [null, [Validators.required]],
            value: [null],
        });

    }
    addConfigCancel() {
        this.addConfigVisible = false;
    }
    addConfigOk() {
        let isValid: boolean = true;
        for (const i in this.configForm.controls) {
            this.configForm.controls[i].markAsDirty();
            this.configForm.controls[i].updateValueAndValidity();
        }
        if (this.configForm.status === "INVALID") {
            this.message.create('error', '请填写必填项!');
            return
        }
        let controlType = this.configForm.value.controlType;
        if (controlType) {
            if (controlType == 'select' || controlType == 'checkbox' || controlType == 'radio') {
                if (Object.values(this.optionFormGroup.value).length <= 0) {
                    this.message.create('error', '请添加选项!');
                    return;
                }
                let opRes: any = this.qcs.formateOptions(this.optionFormGroup.value);
                if (!opRes.invalid) {
                    this.message.create('error', '选项内容不能为空!');
                    return;
                }
                this.configForm.value['options'] = opRes.options;
            }
        } else {
            this.message.create('error', '请选择元素类型!');
        }
        this.panels.forEach((item: any, index) => {
            if (item.key == this.panel.key) {
                let repeatList = this.panel.questions.filter((question: any) => {
                    return question.key == this.configForm.value.key;
                });
                if (repeatList && repeatList.length > 0) {
                    isValid = false;
                }
                if (isValid) {
                    if (this.configForm.value.controlType == "inputgroup") {
                        let inputgroup = [];
                        inputgroup.push(this.configForm.value.value);
                        this.configForm.value.value = inputgroup;
                    }
                    this.panels[index].questions.push(this.configForm.value);
                }

            }
        });
        if (!isValid) {
            this.message.create('error', '配置项key不能重复!');
            return;
        }
        this.addConfigVisible = false;
        this.panels = this.qcs.produceFormData(this.panels);
        //重置数据源
        this.listOfControl = [];
        this.controlType = null;
        this.optionFormGroup = this.fb.group({});
    }

    //下拉选项为 下拉框、多选框、单选框 时
    changeControlType(event) {
        this.controlType = event;
    }
    // 下拉框、多选框、单选框 添加内容option
    addOption(e?: MouseEvent) {
        if (e) {
            e.preventDefault();
        }
        const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

        const control = {
            id,
            label: `label${id}`,
            value: `value${id}`,
        };
        const index = this.listOfControl.push(control);
        this.optionFormGroup.addControl(
            this.listOfControl[index - 1].label,
            new FormControl(null, Validators.required)
        );
        this.optionFormGroup.addControl(
            this.listOfControl[index - 1].value,
            new FormControl(null, Validators.required)
        );

    }
    // 下拉框、多选框、单选框 添加内容option
    removeOption(i: { id: number; label: string; value: string }, e: MouseEvent) {
        if (e) {
            e.preventDefault();
        }
        if (this.listOfControl.length > 0) {
            const index = this.listOfControl.indexOf(i);
            this.listOfControl.splice(index, 1);
            this.optionFormGroup.removeControl(i.label);
            this.optionFormGroup.removeControl(i.value);
        }
    }
}