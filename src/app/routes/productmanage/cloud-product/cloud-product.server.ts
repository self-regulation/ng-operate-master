import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { HttpBaseService } from '@core/net/http-base.service';

@Injectable()
export class CloudProductServer {
    constructor(private httpBaseService: HttpBaseService) {

    }
    //产品查询 admin/product/list
    getProductList(params: any) {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/product/list';
            httpParams.data = {
                pageNum: params.pageNum,
                pageSize: params.pageSize
            };
            if (params.productName) {
                httpParams.data["productName"] = params.productName;
            }
            if (params.productType) {
                httpParams.data["productType"] = params.productType;
            }
            if (params.gameName) {
                httpParams.data["gameName"] = params.gameName;
            }
            if (params.gameId) {
                httpParams.data["gameId"] = params.gameId;
            }
            httpParams.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(httpParams);
        });
    }
}