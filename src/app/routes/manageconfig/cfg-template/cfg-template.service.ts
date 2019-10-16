import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { HttpBaseService } from '@core/net/http-base.service';

@Injectable()
export class CfgTemplateSercive {
    constructor(private httpBaseService: HttpBaseService) {

    }
    //查询配置项
    getGameManagerList(param: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/gameManager/queryItemList';
            params.data = {};
            if (param && param.itemKey) {
                params.data['itemKey'] = param.itemKey;
            }
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.postData(params);
        });
    }
    //新增配置项
    addConfigItem(param: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/gameManager/addItem';
            params.data = {
                itemKey: param.itemKey,
            };
            if (param.paramTemplet) {
                params.data['paramTemplet'] = JSON.stringify(param.paramTemplet);
            }
            if (param.itemName) {
                params.data['itemName'] = param.itemName;

            }
            if (param.desc) {
                params.data['desc'] = param.desc;
            }
            if (param.paramMap) {
                params.data['paramMap'] = JSON.stringify(param.paramMap);
            }
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.postData(params);
        });
    }
    //更新配置项
    updateGameManager(param) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/gameManager/updateItem';
            params.data = {
                itemKey: param.itemKey,
            };
            if (param.itemName) {
                params.data['itemName'] = param.itemName;

            }
            if (param.desc) {
                params.data['desc'] = param.desc;
            }
            if (param.paramTemplet) {
                params.data['paramTemplet'] = JSON.stringify(param.paramTemplet);
            }
            if (param.paramMap) {
                params.data['paramMap'] = JSON.stringify(param.paramMap);
            }
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.postData(params);
        });
    }
    //删除配置项
    deleteGameManager(param) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/gameManager/deleteItem';
            params.data = {
                id: param.id,
                itemKey: param.itemKey,
            };
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.postData(params);
        });
    }
    //查询配置项内容
    queryParamList(param) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/gameManager/queryParamList';
            params.data = {
                id: param.id,
                itemKey: param.itemKey
            };
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(params);
        });
    }
} 