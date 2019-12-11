import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { HttpBaseService } from '@core/net/http-base.service';

@Injectable()
export class MenuAuthorizationService {
    constructor(private httpBaseService: HttpBaseService) {

    }
    //获取角色列表   
    getAllRole() {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/sys/role/allRole';
            httpParams.callback = ((response: any) => {
                observer.next(response);
            });
            this.httpBaseService.getData(httpParams);
        });
    }

    //获取所有角色的菜单权限
    getAllRoleOfMenu() {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/sys/roleMenu/list';
            httpParams.callback = ((response: any) => {
                observer.next(response);
            });
            this.httpBaseService.getData(httpParams);
        });
    }
    //添加菜单权限
    addRoleOfMenu(params: any) {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/sys/roleMenu/add';
            httpParams.data = {
                roleId: params.roleId,
                menuIds: params.menuIds
            };
            httpParams.callback = ((response: any) => {
                observer.next(response);
            });
            this.httpBaseService.postJson(httpParams);
        });
    }

    //删除角色菜单权限
    deleteRoleOfMenu(params: any) {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/sys/roleMenu/delete';
            httpParams.data = {
                roleId: params.roleId,
                menuId: params.menuId
            };
            httpParams.callback = ((response: any) => {
                observer.next(response);
            });
            this.httpBaseService.postJson(httpParams);
        });
    }

    //显示所有一级菜单
    getMenuListFirstNav() {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/sys/menu/listFirstNav';
            httpParams.callback = ((response: any) => {
                observer.next(response);
            });
            this.httpBaseService.getData(httpParams);
        });
    }
    //根据一级菜单id显示子菜单列表
    getChildMenuList(params: any) {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/sys/menu/listMenu';
            httpParams.data = {
                parentId: params.parentId,
            };
            httpParams.callback = ((response: any) => {
                observer.next(response);
            });
            this.httpBaseService.getData(httpParams);
        });
    }
}