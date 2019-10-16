import { FormBase } from './form-base';

export class FormDropdown extends FormBase<string>{
    controlType = 'select';
    options: { label: string, value: string }[] = [];
    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}