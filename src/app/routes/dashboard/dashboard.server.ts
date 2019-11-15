import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { HttpBaseService } from '@core/net/http-base.service';

@Injectable()
export class DashboardServer {
    constructor(private httpBaseService: HttpBaseService) {

    }

    //新增玩家查询
    getNewUserInfo() {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/home/getNewUserInfo';
            httpParams.data = {};
            httpParams.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(httpParams);
        });
    }
    //充值金额查询
    getRecharge() {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/home/getRecharge';
            httpParams.data = {};
            httpParams.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(httpParams);
        });
    }
    //活跃玩家查询
    getActiveUser() {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/home/getActiveUser';
            httpParams.data = {};
            httpParams.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(httpParams);
        });
    }
    //玩家留存查询
    getUserRetainInfo() {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/home/getUserRetention';
            httpParams.data = {};
            httpParams.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(httpParams);
        });
    }

    //http://10.11.164.165:9093/admin/home/getUserTrend
    //活跃用户趋势
    getUserTrend(params: any) {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/home/getUserTrend';
            httpParams.data = {};
            if (params && params.startTime) {
                httpParams.data["startTime"] = params.startTime;
            }
            if (params && params.endTime) {
                httpParams.data["endTime"] = params.endTime;
            }
            httpParams.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(httpParams);
        });
    }

    //http://10.11.164.165:9093/admin/home/getOnlineTime?startTime=2020-06-19 10:30:10&endTime=2020-06-29 10:30:10
    //玩家在线时长 
    getOnlineTime(params: any) {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/home/getOnlineTime';
            httpParams.data = {
                startTime: params.startTime,
                endTime: params.endTime
            };
            httpParams.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(httpParams);
        });
    }

    //服务器使用率
    getServerUseRate() {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/home/getServerUseRate';
            httpParams.data = {};
            httpParams.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(httpParams);
        });
    }
    //服务器信息
    getServerInfo(params: any) {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/home/getServerInfo';
            httpParams.data = {
                pageNum: params.pageNum,
                pageSize: params.pageSize
            };
            httpParams.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(httpParams);
        });
    }
}