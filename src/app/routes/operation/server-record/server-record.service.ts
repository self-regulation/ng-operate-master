import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { HttpBaseService } from '@core/net/http-base.service';

@Injectable()
export class ServerRecordService {
    constructor(private httpBaseService: HttpBaseService) {

    }

    //获取服务资源更新记录
    getServerRecord(params: any) {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/gsUpdate/getOpRecord';
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

    //游戏服务器更新操作详情
    getServerResponse(params: any) {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/gsUpdate/getGmResponse';
            httpParams.data = {
                tId: params.tId
            };
            httpParams.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(httpParams);
        });
    }
}

