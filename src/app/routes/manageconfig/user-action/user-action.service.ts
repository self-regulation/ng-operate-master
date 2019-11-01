import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { HttpBaseService } from '@core/net/http-base.service';

@Injectable()
export class UserActionService {
    constructor(private httpBaseService: HttpBaseService) {


    }
    getGameTask(game: any) {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/gameTask/list';
            params.data = {
                pageNum: game.pageIndex,
                pageSize: game.pageSize
            };
            if (game) {
                if (game.userName) {
                    params.data['userName'] = game.userName;
                }

                if (game.serverName) {
                    params.data['serverName'] = game.serverName;
                }

                if (game.online) {
                    params.data['online'] = game.online;
                }

                if (game.startTime) {
                    params.data['startTime'] = game.startTime;
                }

                if (game.endTime) {
                    params.data['endTime'] = game.endTime;
                }
            }

            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.postData(params);
        });
    }

    getPictureList() {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/gameTask/pictureList';
            params.data = {
                gameId: '10112'
            };
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.postData(params);
        });
    }

    getTaskStatusList() {
        return new Observable((observer) => {
            const params = new AgentHttpParams();
            params.url = '/admin/gameTask/taskStatusList';
            params.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.postData(params);
        });
    }


}