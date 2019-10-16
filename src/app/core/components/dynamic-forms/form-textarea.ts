import { FormBase } from './form-base';

export class FormTextarea extends FormBase<string>{
    controlType = 'textarea';
    type: string;
    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}