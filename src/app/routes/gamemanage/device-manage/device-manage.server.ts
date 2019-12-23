import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { HttpBaseService } from '@core/net/http-base.service';

@Injectable()
export class DeviceManageServer {
    constructor(private httpBaseService: HttpBaseService) {

    }
    //获取设备信息
    getDeviceList(param: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/device/list';
            params.data = {
                pageNum: param.pageIndex,
                pageSize: param.pageSize
            };
            if (param.gameId) {
                params.data['gameId'] = param.gameId;
            }
            if (param.deviceType) {
                params.data['deviceType'] = param.deviceType;
            }
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(params);
        });
    }

    //删除设备
    deleteDevice(param: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/device/delete';
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

    //新增设备
    addDevice(param: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/device/add';
            params.data = {
                gameId: param.gameId,
                deviceType: param.deviceType,
                resource: param.resource,
                status: param.status,
            };
            if (param.deviceModel) {
                params.data["deviceModel"] = param.deviceModel;
            }
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.postJson(params);
        });
    }
    //更新设备
    updateDevice(param: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/device/update';
            params.data = {
                id: param.id,
                gameId: param.gameId,
                deviceType: param.deviceType,
                resource: param.resource,
                status: param.status,
            };
            if (param.deviceModel) {
                params.data["deviceModel"] = param.deviceModel;
            }
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.postJson(params);
        });
    }
}