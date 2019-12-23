import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '@core/storage/storage.service';

@Component({
    selector: 'personal-center',
    templateUrl: './personal-center.component.html',
    styleUrls: ['./personal-center.component.less'],

})
export class PersonalCenterComponent implements OnInit {
    // personalForm: FormGroup;
    userInfo: any;
    constructor(private fb: FormBuilder, private storageService: StorageService) {

    }

    ngOnInit(): void {
        this.userInfo = this.storageService.getUserInfo();
        // this.personalForm = this.fb.group({
        //     username: [this.userInfo.loginName, [Validators.required]],
        //     nickname: [null],
        //     phonenumber: [null, [Validators.required]],
        //     email: [null, [Validators.email, Validators.required]],

        // });
        console.log(this.userInfo);

    }



}