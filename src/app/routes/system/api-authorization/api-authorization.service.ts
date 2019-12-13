import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { HttpBaseService } from '@core/net/http-base.service';

@Injectable()
export class ApiAuthorizationService {
    constructor(private httpBaseService: HttpBaseService) {

    }

    //获取所有角色
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
    //根据角色id获取api权限列表
    getRoleApiByRoleId(params: any) {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/sys/roleApi/list';
            httpParams.data = {
                roleId: params.roleId,
                pageNum: params.pageNum,
                pageSize: params.pageSize
            };
            httpParams.callback = ((response: any) => {
                observer.next(response);
            });
            this.httpBaseService.getData(httpParams);
        });
    }
    //删除角色api权限
    deleteRoleApiByRoleId(params) {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/sys/roleApi/delete';
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

    //新增角色api权限
    addRoleApi(params: any) {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/sys/roleApi/add';
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

    //获取所有api列表
    getAllRoleApi(params: any) {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/sys/api/listAll';
            httpParams.data = {
                pageNum: params.pageNum,
                pageSize: params.pageSize,
            };
            if (params.path) {
                httpParams.data["path"] = params.path;
            }
            if (params.name) {
                httpParams.data["name"] = params.name;
            }
            httpParams.callback = ((response: any) => {
                observer.next(response);
            });
            this.httpBaseService.getData(httpParams);
        });
    }
}
