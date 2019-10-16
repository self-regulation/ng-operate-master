import { Injectable } from '@angular/core';
import { FormBase } from './form-base';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { FormTextbox } from './form-textbox';
import { FormDropdown } from './form-dropdown';
import { FormCheckbox } from './form-checkbox';
import { FormRadio } from './form-radio';
import { FormTextarea } from './form-textarea';
import { FormLabel } from './form-label';
import { FormInputGroup } from './form-inputgroup';

@Injectable()
export class FormControlService {
    constructor() {

    }
    toFormGroup(questions: FormBase<any>[]) {
        let group: any = [];
        questions.forEach((question: any, index) => {
            if (question.controlType == "inputgroup") {
                questions[index].value = eval(question.value);
                group[question.key] = question.required ? new FormControl(question.value || '', Validators.required) : new FormControl(question.value || '');
            } else {
                group[question.key] = question.required ? new FormControl(question.value || '', Validators.required) : new FormControl(question.value || '');
            }

        });
        return new FormGroup(group);
    }

    getFormGroupData(dynamicDatas) {
        if (dynamicDatas && dynamicDatas.length > 0) {
            return this.formateFormData(dynamicDatas);
        } else {
            return null;
        }
    }
    //扁平化表单数据
    formateFormData(dynamicDatas) {
        for (let item in dynamicDatas) {
            if (typeof dynamicDatas[item] == 'object') {
                if (dynamicDatas[item][0] && dynamicDatas[item][0].label) {
                    dynamicDatas[item] = this.checkboxToBinary(dynamicDatas[item]);
                }
            }
        }
        return dynamicDatas;
        // let formDatas = [];
        // dynamicDatas.forEach((item: any) => {
        //     let itemData = {
        //         questions: '',
        //         key: '',
        //         childPanel: []
        //     };
        //     if (!item.childPanel) {
        //         if (item.form) {
        //             item[item.key] = this.checkboxToBinary(item.form.value);
        //         } else {
        //             item[item.key] = {};
        //         }
        //         itemData.questions = item[item.key];
        //         itemData.key = item.key;
        //     } else {
        //         if (item.form) {
        //             item[item.key] = this.checkboxToBinary(item.form.value);
        //         } else {
        //             item[item.key] = {};
        //         }
        //         itemData.questions = item[item.key];
        //         itemData.key = item.key;
        //         itemData.childPanel.push(this.formateFormData(item.childPanel));

        //     }
        //     formDatas.push(itemData);
        // });

        // return formDatas;
    }

    //复选框转二进制
    checkboxToBinary(checkbox: any) {
        let sum = 0;
        checkbox.forEach((item: any, index) => {
            if (item.checked && item.checked == true) {
                let a = 1;
                sum += a << index;
            }
        });
        return sum + '';
        // for (let item in checkbox) {
        //     // if (typeof (checkbox[item]) == 'object' && checkbox[item][0].label) {
        //     let sum = 0;
        //     let checkItem = checkbox[item];
        //     for (let i = 0; i < checkItem.length; i++) {
        //         if (checkItem[i].checked && checkItem[i].checked == true) {
        //             let a = 1;
        //             sum += a << i;
        //         }
        //         checkbox[item] = sum;
        //     }
        //     // }
        // }
        // return checkbox;
    }


    //生产表单数据
    // produceFormData(formData: any) {
    //     let forms = {
    //         questions: formData,
    //         form: null
    //     }
    //     let questions: FormBase<any>[] = [];
    //     if (formData && formData.length > 0) {
    //         forms['form'] = this.toFormGroup(formData);
    //         questions = this.formateQuestions(formData, questions);
    //         console.log('-------------------------------');
    //         console.log(forms);
    //         return forms;
    //     } else {
    //         return {
    //             questions: null,
    //             form: null
    //         }
    //     }
    // }
    //生产表单数据
    produceFormData(formData) {
        let questions: FormBase<any>[] = [];
        if (formData && formData.length > 0) {
            formData.forEach((panel: any) => {
                if (panel.questions && panel.questions.length > 0) {
                    panel['form'] = this.toFormGroup(panel.questions);
                    questions = this.formateQuestions(panel.questions, questions);
                } else {
                    panel['form'] = [];
                    questions = [];
                }
                // if (!panel.childPanel) {
                //     if (panel.questions && panel.questions.length > 0) {
                //         panel['form'] = this.toFormGroup(panel.questions);
                //         questions = this.formateQuestions(panel.questions, questions);
                //         questions.sort((a, b) => a.order - b.order);
                //         panel.questions = questions;
                //     }
                // } else {
                //     if (panel.questions && panel.questions.length > 0) {
                //         panel['form'] = this.toFormGroup(panel.questions);
                //         questions = this.formateQuestions(panel.questions, questions);
                //         questions.sort((a, b) => a.order - b.order);
                //         panel.questions = questions;
                //     }
                // }
            });
            return formData;
        }
    }
    //返回元素对象
    formateQuestions(panelQuestions, questions) {
        panelQuestions.forEach((question: any) => {
            switch (question.controlType) {
                case 'input':
                    questions = questions.concat(
                        new FormTextbox(question)
                    );
                    break;
                case 'inputgroup':
                    if (!question.value) {
                        question['value'] = [''];
                    }
                    questions = questions.concat(
                        new FormInputGroup(question)
                    );
                    break;
                case 'label':
                    questions = questions.concat(
                        new FormLabel(question)
                    );
                    break;
                case 'select':
                    questions = questions.concat(
                        new FormDropdown(question)
                    );
                    break;
                case 'checkbox':
                    questions = questions.concat(
                        new FormCheckbox(question)
                    );
                    break;
                case 'radio':
                    questions = questions.concat(
                        new FormRadio(question)
                    );
                    break;
                case 'textarea':
                    questions = questions.concat(
                        new FormTextarea(question)
                    );
                    break;
            }
        });
        return questions;
    }

    //格式化下拉选项值
    formateOptions(optionObj) {
        let result = {
            invalid: true,
            options: []
        };
        let optionList: Array<any> = Object.entries(optionObj);
        optionList.forEach((item: any, index) => {
            if (!item[1]) {
                result.invalid = false;
            }
            if (index % 2 === 0) {
                let option = {
                    label: item[1],
                    value: optionList[index + 1][1]
                };
                result.options.push(option);
            }
        });
        return result;
    }
}