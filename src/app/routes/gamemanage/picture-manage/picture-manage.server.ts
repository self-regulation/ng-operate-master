import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { HttpBaseService } from '@core/net/http-base.service';

@Injectable()
export class PictureManageServer {
    constructor(private httpBaseService: HttpBaseService) {

    }

    //获取游戏画质
    getPictureList(param: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/picture/list';
            params.data = {
                pageNum: param.pageIndex,
                pageSize: param.pageSize,
            };
            if (param.gameId) {
                params.data['gameId'] = param.gameId;
            }
            if (param.pictureType) {
                params.data['pictureType'] = param.pictureType;
            }
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(params);
        });
    }

    //删除游戏画质
    deletePicture(param: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/picture/delete';
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

    //新增游戏画质
    addPicture(param: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/picture/add';
            params.data = {
                gameId: param.gameId,
                pictureType: param.pictureType,
                pictureDesc: param.pictureDesc,
                needGpu: param.needGpu,
                needCpu: param.needCpu,
                needMemory: param.needMemory,
                needResources: param.needSources
            };
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.postJson(params);
        });
    }
    //更新游戏画质
    updatePicture(params: any) {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/picture/update';
            httpParams.data = {
                gameId: params.gameId,
                pictureType: params.pictureType,
                needGpu: params.needGpu,
                needCpu: params.needCpu,
                needMemory: params.needMemory,
                needResources: params.needSources,
                id: params.id,
                pictureDesc: params.pictureDesc
            };
            httpParams.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.postJson(httpParams);
        });
    }
}