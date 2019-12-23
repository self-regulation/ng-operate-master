import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { HttpBaseService } from '@core/net/http-base.service';

@Injectable()
export class OrderManageServer {
    constructor(private httpBaseService: HttpBaseService) {

    }
    //产品查询 /admin/order/list?pageSize=12&pageNum=1
    getOrderList(params: any) {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/order/list';
            httpParams.data = {
                pageNum: params.pageNum,
                pageSize: params.pageSize
            };
            if (params.productName) {
                httpParams.data["productName"] = params.productName;
            }
            if (params.userName) {
                httpParams.data["userName"] = params.userName;
            }
            if (params.orderId) {
                httpParams.data["orderId"] = params.orderId;
            }
            httpParams.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(httpParams);
        });
    }
}