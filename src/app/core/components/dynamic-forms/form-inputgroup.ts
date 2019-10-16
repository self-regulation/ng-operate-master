import { FormBase } from './form-base';

export class FormInputGroup extends FormBase<string>{
    controlType = 'inputgroup';
    type: string;
    constructor(options: any = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}