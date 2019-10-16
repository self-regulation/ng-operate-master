import { PipeTransform, Pipe } from "@angular/core";
import * as moment from 'moment';
@Pipe({
    name:'timeTransform',
    pure:true
})
export class TimeTransform implements PipeTransform{
    transform(timeValue: any, formatType:any):any {
        if(timeValue){
            if(moment(timeValue).isValid()){
                return moment(timeValue).format(formatType);
            }else{
               return '--';
            }
        }else{
            return '--';
        }
    }

}