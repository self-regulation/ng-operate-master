import { FormBase } from './form-base';

export class FormRadio extends FormBase<string>{
    controlType = 'radio';
    options: { label: string, value: string }[] = [];
    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}