import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { HttpBaseService } from '@core/net/http-base.service';

@Injectable()
export class ProcessMonitorService {
    constructor(private httpBaseService: HttpBaseService) {

    }
    queryAllServersMonitor(param: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/processMonitor/queryAllServersMonitor';
            params.data = {
                pageNum: param.pageNum,
                pageSize: param.pageSize
            };
            if (param.serverName) {
                params.data['serverName'] = param.serverName;
            }
            if (param.userName) {
                params.data['userName'] = param.userName;
            }
            if (param.taskId) {
                params.data['taskId'] = param.taskId;
            }
            if (param.startTime) {
                params.data['startTime'] = param.startTime;
            }
            if (param.endTime) {
                params.data['endTime'] = param.endTime;
            }
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(params);
        });
    }

    queryUsers(param) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/processMonitor/queryUsers';
            params.data = {
                serverName: param.serverName,
                startTime: param.startTime,
                endTime: param.endTime,
            };
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(params);
        });
    }
}