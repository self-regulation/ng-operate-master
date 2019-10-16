import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { HttpBaseService } from '@core/net/http-base.service';

@Injectable()
export class OperateLogService {
    constructor(private httpBaseService: HttpBaseService) {

    }
    getLogList(param) {
        console.log(param);
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/sys/log/list';
            params.data = {
                pageNum: param.pageNum,
                pageSize: param.pageSize
            };
            if (param.title) {
                params.data["title"] = param.title;
            }
            if (param.request_uri) {
                params.data["requestUri"] = param.request_uri;
            }
            if (param.beginDate) {
                params.data["beginDate"] = param.beginDate;
            }
            if (param.endDate) {
                params.data["endDate"] = param.endDate;
            }
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(params);
        });
    }
}