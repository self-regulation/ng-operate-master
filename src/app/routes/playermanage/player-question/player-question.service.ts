import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { HttpBaseService } from '@core/net/http-base.service';

@Injectable()
export class PlayerQuestionService {
    constructor(private httpBaseService: HttpBaseService) {

    }
    getQuestionNaireData(params: any) {
        return new Observable((observer) => {
            const httpParams = new AgentHttpParams();
            httpParams.url = '/admin/questionnaire/list';
            httpParams.data = {
                pageNum: params.pageNum,
                pageSize: params.pageSize
            };
            if (params.userName) {
                httpParams.data["userName"] = params.userName;
            }
            if (params.startDate) {
                httpParams.data["startTime"] = params.startDate;
            }
            if (params.endDate) {
                httpParams.data["endTime"] = params.endDate;
            }

            httpParams.callback = ((response: any) => {
                observer.next(response);
                observer.complete();
            });
            this.httpBaseService.getData(httpParams);
        });
    }
}
