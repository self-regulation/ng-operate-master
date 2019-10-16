import { PipeTransform, Pipe } from "@angular/core";
@Pipe({
    name: 'operationStatus',
    pure: true
})
export class OperationStatus implements PipeTransform {
    transform(statusValue: any, operationType: any): any {
        if (operationType && (statusValue || statusValue == 0)) {
            if (operationType == 'updateServerType') {
                if (statusValue == 0) {
                    return '更改成功';
                } else {
                    return '更改失败';
                }

            } else if (operationType == 'prepareStartGame') {
                switch (statusValue) {
                    case 0:
                        return '启动成功';
                    case 1:
                        return '停止成功';
                    case 21003:
                        return '用户已在线';
                    case 21004:
                        return '用户正在启动中';
                    case 21008:
                        return '没有合适的服务器';
                    default:
                        return '--';

                }
            }
        } else {
            return '--';
        }
    }

}