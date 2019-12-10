import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import {AgentHttpParams} from '../interfaces/agent-http-params';
// import {SessionService} from '../../core/services/session.service';
import { AgentHttpParams } from './agent-http-params';
// 该服务注册到根模块中（注意:懒加载的模块无法享受该服务）
@Injectable({
  providedIn: 'root'
})
export class HttpBaseService {

  constructor(
    private httpClient: HttpClient,
    // private sessionService: SessionService,
  ) {
  }

  private _buildHttpParams(params: object): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          httpParams = httpParams.append(key, params[key]);
        }
      }
    }
    return httpParams;
  }

  private buildHttpHeader(type = 'json'): HttpHeaders {
    let headers = new HttpHeaders();
    // headers.set("Cookies", this.cookieService.getObject('loginUserId'));
    if (type === 'data') {
      headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    }
    if (type === 'json') {
      headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
    }

    // if (this.sessionService.token) {
    //   headers = headers.append(this.sessionService.token.headerName, this.sessionService.token.token);
    // }

    return headers;
  }
  formatParams(params: object): string {
    let paramsString = '';
    let index = 0;
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        if (index == 0) {
          paramsString = paramsString.concat('?', key, '=', params[key]);
        } else {
          paramsString = paramsString.concat('&', key, '=', params[key]);
        }

      }
      index++;
    }
    return paramsString;
  }
  /*异步请求封装*/
  // 封装的postJson方法
  postJson(params: AgentHttpParams) {
    const headers = this.buildHttpHeader('json');
    //const httpParams = this._buildHttpParams(params.data);

    this.httpClient.post(environment.SERVER_URL + params.url, params.data, { headers: headers })
      .subscribe((res: any) => {
        params.callback && params.callback(res);
      });
  }
  // 封装的postData方法
  postData(params: AgentHttpParams) {
    const headers = this.buildHttpHeader('data');
    const httpParams = this._buildHttpParams(params.data);
    this.httpClient.post(environment.SERVER_URL + params.url, httpParams, { headers: headers })
      .subscribe((res: any) => {
        params.callback && params.callback(res);
      });
  }
  // 封装的get方法
  getData(params: AgentHttpParams) {
    const httpParams = this.formatParams(params.data);
    this.httpClient.get(environment.SERVER_URL + params.url + httpParams)
      .subscribe((res: any) => {
        params.callback && params.callback(res);
      });
  }

}
