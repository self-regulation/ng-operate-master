import { Injectable } from '@angular/core';
import { HttpBaseService } from '@core/net/http-base.service';

@Injectable()
export class MenuManageServer {
    constructor(private httpBaseService: HttpBaseService) {

    }
}