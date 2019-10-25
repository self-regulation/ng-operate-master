import { Component, OnDestroy, Inject, Optional, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { MenuService } from '@delon/theme';
import { StorageService } from '@core/storage/storage.service';
@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [LoginService, StorageService],
})
export class UserLoginComponent implements OnDestroy, OnInit {
  mycaptcha: any = environment.SERVER_URL + '/servlet/validateCode?unicorn=' + Math.random();
  form: FormGroup;
  constructor(
    fb: FormBuilder,
    modalSrv: NzModalService,
    @Optional()
    @Inject(ReuseTabService)
    public http: HttpClient,
    public msg: NzMessageService,
    private loginService: LoginService,
    private message: NzMessageService,
    private router: Router,
    private menuService: MenuService,
    private storageService: StorageService,
  ) {
    this.form = fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      // remember: [true],
      validateCode: [null, [Validators.required]]
    });
    modalSrv.closeAll();
  }
  ngOnInit(): void {
  }



  // #endregion

  submit() {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (this.form.status === "INVALID") {
      return
    }
    // this.router.navigateByUrl('/dashboard');
    this.loginService.doLogin(this.form.value).subscribe((res: any) => {
      if (res.code == 0) {
        if (res.data && res.data.menuList && res.data.menuList.length > 0) {
          let menuList = this.loginService.translateDataToTree(res.data.menuList);
          this.storageService.saveMenuInfo(menuList);
          this.menuService.add(menuList);
        }

        this.message.create('success', res.message ? res.message : '操作成功!');
        this.router.navigateByUrl('/dashboard');
      } else {
        this.message.create('error', res.message ? res.message : '操作失败!');
      }
    });
  }

  // 刷新验证码
  refresh = () => this.mycaptcha = environment.SERVER_URL + '/servlet/validateCode?unicorn=' + Math.random();
  ngOnDestroy(): void {

  }
}
