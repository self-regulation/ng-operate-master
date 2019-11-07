import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpBaseService } from '@core/net/http-base.service';
import { StorageService } from '@core/storage/storage.service';

@Component({
  selector: 'header-user',
  templateUrl: './user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [StorageService]
})
// <div nz-menu-item routerLink="/pro/account/settings">
// <i nz-icon nzType="setting" class="mr-sm"></i>
// 个人设置
// </div>
export class HeaderUserComponent {
  themeSkin: any = null;
  constructor(
    public settings: SettingsService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private message: NzMessageService,
    private httpBaseService: HttpBaseService,
    public storageService: StorageService,
  ) {
    this.themeSkin = this.storageService.getStorageValue('customize-theme');
    if (this.themeSkin) {
      const body = document.getElementsByTagName('body')[0];
      body.setAttribute('customize-theme-style', this.themeSkin);
    }
  }

  logout() {
    const params = new AgentHttpParams();
    params.url = '/admin/logout';
    params.callback = ((response: any) => {
      if (response.code == 0 && response.data) {
        this.message.create('success', response.message ? response.message : '操作成功!');
      } else {
        this.message.create('error', response.message ? response.message : '操作失败!');
      }
      this.tokenService.clear();
      this.storageService.clearUserInfo();
      this.router.navigateByUrl('/passport/login');
    });
    this.httpBaseService.postData(params);
    // this.router.navigateByUrl('/passport/login');

  }

  changeSkin(skin) {
    const body = document.getElementsByTagName('body')[0];
    body.setAttribute('customize-theme-style', skin);
    this.storageService.setStorageValue('customize-theme', skin);
  }
}
