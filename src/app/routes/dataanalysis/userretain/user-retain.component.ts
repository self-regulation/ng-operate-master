import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { userRetain } from '@shared';
import { UserInfo } from '@shared/utils/userInfo';

@Component({
    selector: 'user-retain',
    templateUrl: './user-retain.component.html',
    styleUrls: ['./user-retain.component.less']
})
export class UserRetainComponent implements OnInit {
    userRetainForm: FormGroup;
    startTime: any = '';
    endTime: any = '';
    userRetainList: any = [];
    userInfoList: any = [];
    constructor(private fb: FormBuilder, private http: HttpClient) {

    }

    ngOnInit(): void {
        this.userRetainForm = this.fb.group({
            initialAction: [null],
            finallyAction: [null],
            sameDisplay: [null],
            dateRange: [null],
        });

        this.getUserRetainData();
    }

    getUserRetainData() {
        this.userRetainList = (userRetain()).rows;
    }

    clear(event: any) {
        if (!event || event.length <= 0) {
            this.startTime = '';
            this.endTime = '';
        }
    }
}