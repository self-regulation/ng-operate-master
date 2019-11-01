import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { HttpBaseService } from '@core/net/http-base.service';

@Injectable()
export class UserRetainServer {
    constructor(private httpBaseService: HttpBaseService) {

    }
    //获取用户留存情况
    getUserRetentionList(param: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/gameTask/userRetention';
            params.data = {
                startDate: param.startDate,
                endDate: param.endDate,
                stayDays: param.stayDays
            };
            if (param.gameId) {
                params.data['gameId'] = param.gameId;
            }
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(params);
        });
    }
}