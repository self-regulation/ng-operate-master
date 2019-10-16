import { FormBase } from './form-base';

export class FormLabel extends FormBase<string>{
    controlType = 'label';
    type: string;
    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}