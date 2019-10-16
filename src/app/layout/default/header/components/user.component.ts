import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpBaseService } from '@core/net/http-base.service';

@Component({
  selector: 'header-user',
  template: `
    <div
      class="alain-default__nav-item d-flex align-items-center px-sm"
      nz-dropdown
      nzPlacement="bottomRight"
      [nzDropdownMenu]="userMenu"
    >
      <nz-avatar [nzSrc]="settings.user.avatar" nzSize="small" class="mr-sm"></nz-avatar>
      {{ settings.user.name }}
    </div>
    <nz-dropdown-menu #userMenu="nzDropdownMenu">
      <div nz-menu class="width-sm">
        <div nz-menu-item routerLink="/center/personal">
          <i nz-icon nzType="user" class="mr-sm"></i>
          个人中心
        </div>
        <li nz-menu-divider></li>
        <div nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          退出登录
        </div>
      </div>
    </nz-dropdown-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// <div nz-menu-item routerLink="/pro/account/settings">
// <i nz-icon nzType="setting" class="mr-sm"></i>
// 个人设置
// </div>
export class HeaderUserComponent {
  constructor(
    public settings: SettingsService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private message: NzMessageService,
    private httpBaseService: HttpBaseService,
  ) { }

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
      this.router.navigateByUrl('/passport/login');
    });
    this.httpBaseService.postData(params);
  }
}
