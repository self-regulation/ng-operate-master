import { Component, OnInit } from "@angular/core";
import { UserInfo } from '@shared/utils/userInfo';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
    userListForm: FormGroup;
    userInfoList: any = [];
    startDate: any;
    endDate: any;
    constructor(private fb: FormBuilder) {

    }
    ngOnInit(): void {
        this.userListForm = this.fb.group({
            userId: [null],
            userName: [null],
        });
        this.userInfoList = (UserInfo()).users;
        this.getUserRetentionList();
    }

    getUserRetentionList() {

    }
}