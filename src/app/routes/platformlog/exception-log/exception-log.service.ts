import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { HttpBaseService } from '@core/net/http-base.service';
@Injectable()
export class ExceptionLogService {
    constructor(private httpBaseService: HttpBaseService) {

    }
    //云游戏日志查询
    getCloudGameLog(params: any) {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/log/listCloudGameLog';
            httpParams.data = {
                pageNum: params.pageNum,
                pageSize: params.pageSize
            };
            if (params.serverName) {
                httpParams.data["serverName"] = params.serverName;
            }
            if (params.startTime) {
                httpParams.data["startTime"] = params.startTime;
            }
            if (params.endTime) {
                httpParams.data["endTime"] = params.endTime;
            }
            httpParams.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(httpParams);
        });

    }

}