import { Injectable } from '@angular/core';
import { HttpBaseService } from '@core/net/http-base.service';
import { Observable } from 'rxjs';
import { AgentHttpParams } from '@core/net/agent-http-params';

@Injectable()
export class GameBillService {
    constructor(private httpBaseService: HttpBaseService) {

    }
    //计费查询
    getChargeLogList(params: any) {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/chargelog/list';
            httpParams.data = {
                pageNum: params.pageNum,
                pageSize: params.pageSize
            };
            if (params.userName) {
                httpParams.data["userName"] = params.userName;
            }
            if (params.type) {
                httpParams.data["type"] = params.type;
            }
            if (params.gameId) {
                httpParams.data["gameId"] = params.gameId;
            }
            if (params.picture) {
                httpParams.data["picture"] = params.picture;
            }
            if (params.resource) {
                httpParams.data["resource"] = params.resource;
            }
            httpParams.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(httpParams);
        });
    }
}