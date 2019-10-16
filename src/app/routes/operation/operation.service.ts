import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { HttpBaseService } from '@core/net/http-base.service';

@Injectable()
export class OperationService {
    constructor(private httpBaseService: HttpBaseService) {

    }
    //查询运维操作列表
    getOperationManagerList() {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/operationManager/queryList';
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(params);
        });
    }

    //新增运维
    addConfigItem(param: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/operationManager/add';
            params.data = {
                operationKey: param.itemKey,
            };
            if (param.paramTemplet) {
                params.data['paramTemplet'] = JSON.stringify(param.paramTemplet);
            }
            if (param.itemName) {
                params.data['operationName'] = param.itemName;

            }
            if (param.desc) {
                params.data['description'] = param.desc;
            }
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.postData(params);
        });
    }

    //删除配置
    deleteOperation(param: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/operationManager/delete';
            params.data = {
                // id: param.id,
                operationKey: param.itemKey,
            };
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.postData(params);
        });
    }
    //修改运维配置
    updateOperationManager(param: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/operationManager/update';
            params.data = {
                operationKey: param.itemKey,
            };
            if (param.paramTemplet) {
                params.data['paramTemplet'] = JSON.stringify(param.paramTemplet);
            }
            if (param.itemName) {
                params.data['operationName'] = param.itemName;

            }
            if (param.desc) {
                params.data['description'] = param.desc;
            }
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.postData(params);
        });
    }
    //运维记录查询
    getOperationLoglist(param: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/operationManager/queryLogList';
            params.data = {
                pageNum: param.pageNum,
                pageSize: param.pageSize
            };
            if (param.operationKey) {
                params.data["operationKey"] = param.operationKey;
            }
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(params);
        });
    }
    //查询服务器IP和分类   /admin/operationManager/gameServerMap
    getGameServerMap() {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/operationManager/gameServerMap';
            params.data = {};
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(params);
        });
    }
    //提交命令执行 /admin/operationManager/execute?operationKey=10.11.112.2&param={“111”："111"}
    executeOperationManager(param: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/operationManager/execute';
            params.data = {
                operationKey: param.operationKey,
                param: param.param
            };
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.postData(params);
        });
    }

    //预启动游戏停止 /admin/operationManager/prepareStop?user=11111
    gamePrepareStop(param: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/operationManager/prepareStop';
            params.data = {
                user: param.user
            };
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(params);
        });
    }

}