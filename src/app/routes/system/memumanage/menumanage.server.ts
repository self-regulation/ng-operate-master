import { Injectable } from '@angular/core';
import { HttpBaseService } from '@core/net/http-base.service';
import { Observable } from 'rxjs';
import { AgentHttpParams } from '@core/net/agent-http-params';

@Injectable()
export class MenuManageServer {
    constructor(private httpBaseService: HttpBaseService) {

    }

    //获取菜单列表
    getMenuList(param?: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/sys/menu/list';
            params.data = {
            };
            if (param.name) {
                params.data["name"] = param.name;
            }
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(params);
        });
    }

    //添加菜单或者更新菜单
    saveMenu(param: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/sys/menu/save';
            params.data = {
                parentId: param.parentId,
                name: param.name,
                menukey: param.menukey,
                icon: param.icon,
                isShow: param.isShow,
                sort: param.sort,
                remarks: param.remarks
            };
            if (param.id) {
                params.data["id"] = param.id;
            }
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.postJson(params);
        });
    }
    //删除菜单
    deleteMenu(param: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/sys/menu/delete';
            params.data = {
                id: param.id
            };
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.postJson(params);
        });
    }

    //获取菜单具体信息
    getMenuInfo(param: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/sys/menu/getMenu';
            params.data = {
                id: param.id
            };
            params.callback = ((response: any) => {
                observer.next(response);
            });
            this.httpBaseService.getData(params);
        });
    }
}