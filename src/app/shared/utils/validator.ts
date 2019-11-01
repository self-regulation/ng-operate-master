import { FormControl } from '@angular/forms';

// 验证金额数字
export function amountValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
        const valid = regs.test(control.value);
        return valid ? null : { amountValidator: true };
    }
}
//正整数
export function positiveValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /^[1-9]+[0-9]*?$/;
        const valid = regs.test(control.value);
        return valid ? null : { positiveValidator: true };
    }
}
//纯数字
export function numericValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /^[0-9]+$/;
        const valid = regs.test(control.value);
        return valid ? null : { numericValidator: true };
    }
}
//必须是整数
export function integerValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /^\-?[0-9]+$/;
        const valid = regs.test(control.value);
        return valid ? null : { integerValidator: true };
    }
}
//浮点数
export function decimalValidator(control: FormControl): any {
    if (!control.value) {
        return { requiredValidator: true };
    } else {
        const regs = /^\-?[0-9]*\.?[0-9]+$/;
        const valid = regs.test(control.value);
        return valid ? null : { decimalValidator: true };
    }
}
//正浮点数
export function isdecimalValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /^[0-9]*\.?[0-9]+$/;
        const valid = regs.test(control.value);
        return valid ? null : { isdecimalValidator: true };
    }
}
//Email地址验证
export function emailValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+(\.[a-zA-Z]{2,5})+$/;
        const valid = regs.test(control.value);
        return valid ? null : { emailValidator: true };
    }
}
//纯字母
export function alphaValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /^[a-z]+$/i;
        const valid = regs.test(control.value);
        return valid ? null : { alphaValidator: true };
    }
}
//字母和数字
export function alphaNumericValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /^[a-zA-Z0-9]+$/i;
        const valid = regs.test(control.value);
        return valid ? null : { alphaNumericValidator: true };
    }
}
//字母数字字符、下划线和破折号
export function alphaDashValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /^[a-zA-Z0-9_\-]+$/i;
        const valid = regs.test(control.value);
        return valid ? null : { alphaDashValidator: true };
    }
}
//必须是正整数
export function naturalDashValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /^[0-9]+$/i;
        const valid = regs.test(control.value);
        return valid ? null : { naturalDashValidator: true };
    }
}
//必须是非零的整数
export function naturalNoZeroValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /^[1-9][0-9]*$/i;
        const valid = regs.test(control.value);
        return valid ? null : { naturalNoZeroValidator: true };
    }
}
//必须包含一个有效的IP
export function ipValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /^(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)$/i;
        const valid = regs.test(control.value);
        return valid ? null : { ipValidator: true };
    }
}
//必须包含一个base64字符串
export function base64Validator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /[^a-zA-Z0-9\/\+=]/i;
        const valid = regs.test(control.value);
        return valid ? null : { base64Validator: true };
    }
}
//必须是数字，-，空白字符、空格、制表符和换行符
export function numericDashValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /^[\d\-\s]+$/;
        const valid = regs.test(control.value);
        return valid ? null : { numericDashValidator: true };
    }
}
//必须包含一个有效的网址
export function urlValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /^((https?|ftp|news):\/\/)?([a-z]([a-z0-9\-]*[\.。])+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&]*)?)?(#[a-z][a-z0-9_]*)?$/;
        const valid = regs.test(control.value);
        return valid ? null : { urlValidator: true };
    }
}
//必须包含日期格式YYYY-MM-DD
export function dateValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}/;
        const valid = regs.test(control.value);
        return valid ? null : { dateValidator: true };
    }
}
//必须是中文字符
export function chineseCharacterValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /^[\u2E80-\uFE4F]+$/;
        const valid = regs.test(control.value);
        return valid ? null : { chineseCharacterValidator: true };
    }
}
//必须是有效手机号码
export function mobilePhoneValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /^1(3[0-9]|4[0-9]|5[0-9]|66|8[0-9]|7[0-9]|9[0-9])\d{8}$/;
        const valid = regs.test(control.value);
        return valid ? null : { mobilePhoneValidator: true };
    }
}
//必须是有效电话号码
export function telephoneValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /^(^0\d{2}-?\d{8}$)|(^0\d{3}-?\d{7}$)|(^0\d2-?\d{8}$)|(^0\d3-?\d{7}$)$/;
        const valid = regs.test(control.value);
        return valid ? null : { telephoneValidator: true };
    }
}
//必须是有效QQ号码
export function qqValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /^[1-9]([0-9]{5,11})$/;
        const valid = regs.test(control.value);
        return valid ? null : { qqValidator: true };
    }
}
//必须是有效的邮政编码
export function postcodeValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /^\d{6}$/;
        const valid = regs.test(control.value);
        return valid ? null : { postcodeValidator: true };
    }
}
//必须是有效身份证号码
export function idCardValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        const valid = regs.test(control.value);
        return valid ? null : { idCardValidator: true };
    }
}
//必须是有效用户名
export function usernameValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /^[A-Za-z0-9_\-\u2E80-\uFE4F]+$/;
        const valid = regs.test(control.value);
        return valid ? null : { usernameValidator: true };
    }
}
//不能包含空格等空白符
export function blankValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /^[^\s]*$/;
        const valid = regs.test(control.value);
        return valid ? null : { blankValidator: true };
    }
}
//必须是有效微信号
export function weixinValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /^[a-zA-Z\d_-]{5,}$/;
        const valid = regs.test(control.value);
        return valid ? null : { weixinValidator: true };
    }
}
//必须是中文字符或者英文字符
export function chinesealphaValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /^[a-zA-Z\u2E80-\uFE4F]+$/;
        const valid = regs.test(control.value);
        return valid ? null : { chinesealphaValidator: true };
    }
}
//必须是非零正数或两位正浮点数
export function moneyNoZeroValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /(^[1-9]\d*(\.[0-9]{1,2})?$)|(^[0]\.(([0]{0,1}[1-9])|([1-9][0-9]{0,1}))$)/;
        const valid = regs.test(control.value);
        return valid ? null : { moneyNoZeroValidator: true };
    }
}
//必须是http或者https开头的网址
export function webUrlValidator(control: FormControl): any {
    if (!control.value) {
        return { required: true };
    } else {
        const regs = /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/;
        const valid = regs.test(control.value);
        return valid ? null : { webUrlValidator: true };
    }
}
