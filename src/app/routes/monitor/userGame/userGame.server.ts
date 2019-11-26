import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { HttpBaseService } from '@core/net/http-base.service';

@Injectable()
export class UserGameServer {
    constructor(private httpBaseService: HttpBaseService) {

    }
    //查询用户游戏过程的服务器信息
    getGmUserPerformance(params: any) {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/home/getGmUserPerformance';
            httpParams.data = {
                pageNum: params.pageNum,
                pageSize: params.pageSize
            };
            if (params.taskId) {
                httpParams.data['taskId'] = params.taskId
            }
            if (params.user) {
                httpParams.data['user'] = params.user
            }
            httpParams.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(httpParams);
        });
    }
}