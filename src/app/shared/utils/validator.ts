import { FormControl } from '@angular/forms';

// 验证金额数字
export function amountValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
        const valid = regs.test(control.value);
        return valid ? null : { amount: true };
    }
}
//正整数
export function positiveValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /^[1-9]+[0-9]*?$/;
        const valid = regs.test(control.value);
        return valid ? null : { positive: true };
    }
}

