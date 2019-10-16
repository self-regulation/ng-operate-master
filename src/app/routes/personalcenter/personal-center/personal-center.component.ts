import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'personal-center',
    templateUrl: './personal-center.component.html',
    styleUrls: ['./personal-center.component.less'],

})
export class PersonalCenterComponent implements OnInit {
    validateForm: FormGroup;

    constructor(private fb: FormBuilder) {

    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            username: [null, [Validators.required]],
            nickname: [null],
            phonenumber: [null, [Validators.required]],
            email: [null, [Validators.email, Validators.required]],

        });
    }



}