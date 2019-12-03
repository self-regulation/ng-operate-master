import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { HttpBaseService } from '@core/net/http-base.service';

@Injectable()
export class ServerUpdateService {
    constructor(private httpBaseService: HttpBaseService) {

    }

    //获取游戏服务器信息
    inquireServerInfo(params: any) {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/gsUpdate/listGs';
            httpParams.data = {
                pageNum: params.pageNum,
                pageSize: params.pageSize
            };
            if (params.serverName) {
                httpParams.data["serverName"] = params.serverName;
            }

            if (params.status) {
                httpParams.data["status"] = params.status;
            }

            httpParams.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(httpParams);
        });
    }
}