import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { HttpBaseService } from '@core/net/http-base.service';

@Injectable()
export class PeoplemanageService {
    constructor(private httpBaseService: HttpBaseService) {

    }

    saveOrUpdatePeopleinfo(userinfo: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/sys/user/save';
            params.data = {
                mobile: userinfo.mobile,
                loginName: userinfo.loginName,
                name: userinfo.name,
                password: userinfo.password
            };
            if (userinfo.id) {
                params.data['id'] = userinfo.id;
            }
            params.callback = ((response: any) => {
                observer.next(response);
            });
            this.httpBaseService.postData(params);
        });
    }

    //删除用户
    deleteUser(userId) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/sys/user/delete';
            params.data = {
                id: userId
            };
            params.callback = ((response: any) => {
                observer.next(response);
            });
            this.httpBaseService.postData(params);
        });
    }

    //查询用户
    getUserList(param: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/sys/user/list';
            params.data = {
                pageNo: param.pageIndex,
                pageSize: param.pageSize
            };
            if (param.loginName) {
                params.data["loginName"] = param.loginName;
            }
            if (param.name) {
                params.data["name"] = param.name;
            }
            params.callback = ((response: any) => {
                observer.next(response);
                // if (response.code == 0 && response.data) {
                //     this.total = response.data.total;
                //     this.listOfData = response.data.list;
                // } else {
                //     this.message.create('error', response.message ? response.message : '登录失败!');
                // }
            });
            this.httpBaseService.getData(params);
        });

    }

}