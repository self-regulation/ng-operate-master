import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { HttpBaseService } from '@core/net/http-base.service';

@Injectable()
export class WhiteListService {
    constructor(private httpBaseService: HttpBaseService) {

    }
    //查询用户白名单数据
    getWhiteUserList(params: any) {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/user/list';
            httpParams.data = {
                pageNum: params.pageNum,
                pageSize: params.pageSize
            };
            if (params.userName) {
                httpParams.data["userName"] = params.userName;
            }
            if (params.status) {
                httpParams.data["status"] = params.status;
            }
            if (params.playerType) {
                httpParams.data["type"] = params.playerType;
            }
            httpParams.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(httpParams);
        });
    }

    //新增用户
    addUser(params: any) {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/user/add';
            httpParams.data = {
                gameId: params.gameId,
                userName: params.userName,
                status: params.status,
                type: params.playerType
            };
            httpParams.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.postJson(httpParams);
        });
    }

    //更新用户状态
    updateUser(params: any) {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/user/update';
            httpParams.data = {
                id: params.id,
                status: params.status
            };
            if (params.playerType) {
                httpParams.data["type"] = params.playerType;
            }
            httpParams.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.postJson(httpParams);
        });
    }
}