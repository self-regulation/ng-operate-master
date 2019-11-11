import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { HttpBaseService } from '@core/net/http-base.service';

@Injectable()
export class ServiceServer {
    constructor(private httpBaseService: HttpBaseService) {

    }
    //查询服务器组 
    queryAllRegion() {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/serverMonitor/queryAllRegion';
            params.data = {};
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(params);
        });
    }
    //服务器查询 
    queryGameServerByRegion(param: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/serverMonitor/queryGameServerByRegion';
            params.data = {
                region: param.region,
                pageNum: param.pageNum,
                pageSize: param.pageSize
            };
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(params);
        });
    }

    //查询服务器
    queryAllServers() {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/serverMonitor/queryAllServers';
            params.data = {};
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(params);
        });
    }
    //查询服务器的CPU 
    queryCpuDatas(param: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/serverMonitor/queryCpuDatas';
            params.data = {
                serverName: param.serverName,
                startTime: param.startTime,
                endTime: param.endTime
            };
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(params);
        });
    }
    //查询服务器的内存 
    queryMemoryDatas(param: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/serverMonitor/queryMemoryDatas';
            params.data = {
                serverName: param.serverName,
                startTime: param.startTime,
                endTime: param.endTime
            };
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(params);
        });
    }
    //查询服务器的磁盘
    queryDiskDatas(param: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/serverMonitor/queryDiskDatas';
            params.data = {
                serverName: param.serverName,
                startTime: param.startTime,
                endTime: param.endTime,
            };
            if (param.diskName) {
                params.data['diskName'] = param.diskName;
            }
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(params);
        });
    }
    //查询服务器的GPU
    queryGpuDatas(param: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/serverMonitor/queryGpuDatas';
            params.data = {
                serverName: param.serverName,
                startTime: param.startTime,
                endTime: param.endTime,
                diskName: param.gpuId
            };
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(params);
        });
    }

    //http://10.11.164.165:9093/admin/serverMonitor/queryAllServersMonitor
    //查询所有服务器参数
    queryAllServersMonitor(param: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/serverMonitor/queryAllServersMonitor';
            params.data = {
                pageNum: param.pageNum,
                pageSize: param.pageSize
            };
            if (param.serverName) {
                params.data['serverName'] = param.serverName;
            }
            if (param.status) {
                params.data['status'] = param.status;
            }
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(params);
        });
    }


}