import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpBaseService } from '@core/net/http-base.service';

@Component({
    selector: 'reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.less']
})
export class ResetPasswordComponent implements OnInit {
    validateForm: FormGroup;
    constructor(private fb: FormBuilder,
        private message: NzMessageService,
        private httpBaseService: HttpBaseService, ) {
        this.validateForm = this.fb.group({
            curPassword: [null, [Validators.required]],
            newPassword: [null, [Validators.required]],
            confirmPassword: [null, [Validators.required]],

        });
    }
    ngOnInit(): void {

    }

    updatePassword() {
        if (this.validateForm.status === "INVALID") {
            return;
        }
        if (this.validateForm.controls.newPassword.value != this.validateForm.controls.confirmPassword.value) {
            this.message.create('error', '两次密码输入不一致，请重新输入！');
            return;
        }

        const resetParams = new AgentHttpParams();
        resetParams.url = '/admin/sys/user/modifyPwd';
        resetParams.data = {
            oldPassword: this.validateForm.controls.curPassword.value,
            newPassword: this.validateForm.controls.newPassword.value
        };

        resetParams.callback = ((response: any) => {
            if (response.code == 0) {
                this.message.create('success', response.message ? response.message : '操作成功!');
                this.validateForm = this.fb.group({
                    curPassword: [null, [Validators.required]],
                    newPassword: [null, [Validators.required]],
                    confirmPassword: [null, [Validators.required]],

                });
            } else {
                this.message.create('error', response.message ? response.message : '操作失败!');
            }
        });
        console.log(resetParams);
        this.httpBaseService.postData(resetParams);
    }

}