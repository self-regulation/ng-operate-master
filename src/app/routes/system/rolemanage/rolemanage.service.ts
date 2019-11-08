import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { HttpBaseService } from '@core/net/http-base.service';

@Injectable()
export class RolemanageService {
    constructor(private httpBaseService: HttpBaseService) {

    }

    //获取角色列表
    getRoleList(param: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/sys/role/list';
            params.data = {
                pageNo: param.pageIndex,
                pageSize: param.pageSize
            };
            if (param.allRole) {
                params.data["name"] = param.allRole;
            }
            params.callback = ((response: any) => {
                observer.next(response);
            });
            this.httpBaseService.getData(params);
        });
    }
    //保存、修改角色
    saveRole(user: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/sys/role/save';
            params.data = {
                name: user.name,
                roleType: user.selectRole ? user.selectRole : '',
                remarks: user.remarks
            };

            if (user.id) {
                params.data['id'] = user.id;
            }

            params.callback = ((response: any) => {
                observer.next(response);
            });
            this.httpBaseService.postData(params);
        });
    }
    //删除角色 admin/sys/role/delete?id=1
    deleteRole(id) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/sys/role/delete';
            params.data = {
                id: id
            };
            params.callback = ((response: any) => {
                observer.next(response);
            });
            this.httpBaseService.postData(params);
        });
    }

    //获取角色列表   
    getAllRole() {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/sys/role/allRole';
            params.callback = ((response: any) => {
                observer.next(response);
            });
            this.httpBaseService.getData(params);
        });
    }

}