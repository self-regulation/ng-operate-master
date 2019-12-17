import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { HttpBaseService } from '@core/net/http-base.service';

@Injectable()
export class UserdataCollectServer {
    constructor(private httpBaseService: HttpBaseService) {

    }
    //玩家埋点数据
    getUserdataCollect(params: any) {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/dataCollect/list';
            httpParams.data = {
                pageSize: params.pageSize,
                pageNum: params.pageNum
            };
            if (params.userName) {
                httpParams.data['userName'] = params.userName;
            }
            if (params.eventName) {
                httpParams.data['eventName'] = params.eventName;
            }
            if (params.startDate) {
                httpParams.data['startTime'] = params.startDate;
            }
            if (params.endDate) {
                httpParams.data['endTime'] = params.endDate;
            }
            httpParams.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(httpParams);
        });
    }
}