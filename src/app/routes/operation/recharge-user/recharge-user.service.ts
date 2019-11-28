import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { HttpBaseService } from '@core/net/http-base.service';

@Injectable()
export class RechargeUserService {
    constructor(private httpBaseService: HttpBaseService) {

    }
    //计费用户查询
    getChargeUserList(params: any) {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/chargeUser/list';
            httpParams.data = {
                pageNum: params.pageNum,
                pageSize: params.pageSize
            };
            if (params.userName) {
                httpParams.data["userName"] = params.userName;
            }
            if (params.status) {
                httpParams.data["status"] = params.status;
            }
            if (params.gameId) {
                httpParams.data["gameId"] = params.gameId;
            }
            if (params.online) {
                httpParams.data["online"] = params.online;
            }
            httpParams.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(httpParams);
        });
    }
}