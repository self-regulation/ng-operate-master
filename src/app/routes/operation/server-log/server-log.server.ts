import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { HttpBaseService } from '@core/net/http-base.service';

@Injectable()
export class ServerLogService {
    constructor(private httpBaseService: HttpBaseService) {

    }
    getLogList(param) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/serverLog/list';
            params.data = {
                pageNum: param.pageNum,
                pageSize: param.pageSize
            };
            if (param.userName) {
                params.data["userName"] = param.userName;
            }
            if (param.startTime) {
                params.data["startTime"] = param.startTime;
            }
            if (param.endTime) {
                params.data["endTime"] = param.endTime;
            }
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(params);
        });
    }
}