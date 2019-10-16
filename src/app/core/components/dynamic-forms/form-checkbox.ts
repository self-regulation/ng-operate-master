import { FormBase } from './form-base';

export class FormCheckbox extends FormBase<string>{
    controlType = 'checkbox';
    options: { label: string, value: string }[] = [];
    constructor(options: any = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}