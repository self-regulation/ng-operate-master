import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { HttpBaseService } from '@core/net/http-base.service';

@Injectable()
export class ApiListService {
    constructor(private httpBaseService: HttpBaseService) {

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

    //删除API 
    deleteApi(params: any) {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/sys/api/delete';
            httpParams.data = {
                id: params.id,
            };
            httpParams.callback = ((response: any) => {
                observer.next(response);
            });
            this.httpBaseService.postJson(httpParams);
        });
    }

    //新增api

    addApi(params: any) {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/sys/api/add';
            httpParams.data = {
                parentId: 0,
                parentIds: "0,1",
                name: params.name,
                path: params.path,
                menukey: params.menukey,
                isShow: "0",
                sort: 1
            };
            if (params.remarks) {
                httpParams.data["remarks"] = params.remarks;
            }
            httpParams.callback = ((response: any) => {
                observer.next(response);
            });
            this.httpBaseService.postJson(httpParams);
        });
    }
}