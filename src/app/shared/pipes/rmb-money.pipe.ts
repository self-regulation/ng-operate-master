import { PipeTransform, Pipe } from "@angular/core";
@Pipe({
    name: 'rmbConversion',
    pure: true
})
export class RmbConversion implements PipeTransform {
    transform(value: any, digits: number = 0): any {
        if (typeof value != 'number' && typeof value != 'string') {
            return '--';
        }
        if (digits != 0) {
            if (typeof value == 'number') {
                value = value.toFixed(digits);
            } else {
                value = parseFloat(value).toFixed(digits);
            }
        }

        let _regx = /[-]?[0-9]+(\.[0-9]+)?/.exec(value);
        if (!_regx)
            return '0.00';
        let _temp = _regx[0].split('.');
        _temp[0] = _temp[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        _temp[1] = _temp[1] || '00';
        _temp[1].length < 2 && (_temp[1] += '0');
        return _temp.join('.');
    }

}