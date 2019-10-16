import { FormBase } from './form-base';

export class FormTextbox extends FormBase<string>{
    controlType = 'input';
    type: string;
    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
        console.log(options);
    }
}