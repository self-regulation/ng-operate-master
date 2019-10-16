import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN } from '@delon/theme';
// import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ACLService } from '@delon/acl';

import { NzIconService } from 'ng-zorro-antd/icon';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { ICONS } from '../../../style-icons';

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    // @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private httpClient: HttpClient,
    private injector: Injector
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  private viaHttp(resolve: any, reject: any) {
    zip(
      this.httpClient.get('assets/tmp/app-data.json')
    ).pipe(
      catchError(([appData]) => {
        resolve(null);
        return [appData];
      })
    ).subscribe(([appData]) => {

      // Application data
      const res: any = appData;
      // Application information: including site name, description, year
      this.settingService.setApp(res.app);
      // User information: including name, avatar, email address
      this.settingService.setUser(res.user);
      // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
      this.aclService.setFull(true);
      // Menu data, https://ng-alain.com/theme/menu
      // this.menuService.add(res.menu);
      // Can be set page suffix title, https://ng-alain.com/theme/title
      this.titleService.suffix = res.app.name;
    },
      () => { },
      () => {
        resolve(null);
      });
  }

  private viaMock(resolve: any, reject: any) {
    // const tokenData = this.tokenService.get();
    // if (!tokenData.token) {
    //   this.injector.get(Router).navigateByUrl('/passport/login');
    //   resolve({});
    //   return;
    // }
    // mock

    const app: any = {
      name: `云游戏`,
      description: `云游戏运营管理平台`
    };
    const user: any = {
      name: 'Admin',
      avatar: './assets/tmp/img/avatar.jpg',
      email: 'cipchk@qq.com',
      token: '123456789'
    };
    // Application information: including site name, description, year
    this.settingService.setApp(app);
    // User information: including name, avatar, email address
    this.settingService.setUser(user);
    // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
    this.aclService.setFull(true);
    // Menu data, https://ng-alain.com/theme/menu
    console.log(this.menuService.menus);
    // Can be set page suffix title, https://ng-alain.com/theme/title
    this.titleService.suffix = app.name;

    // this.menuService.add(
    //   [
    //     {
    //       // "text": "首页",
    //       "group": true,
    //       "hideInBreadcrumb": true,
    //       "children": [
    //         {
    //           "text": "仪表盘",
    //           "hideInBreadcrumb": true,
    //           "icon": "anticon-dashboard",
    //           "children": [
    //             {
    //               "text": "数据监控",
    //               "hideInBreadcrumb": true,
    //               "link": "/dashboard",
    //             },
    //           ]
    //         },
    //         {
    //           "text": "配置管理",
    //           "hideInBreadcrumb": false,
    //           "icon": "anticon-tool",
    //           "key": "pz_gl",
    //           "children": [
    //             {
    //               "text": "游戏管理",
    //               "hideInBreadcrumb": false,
    //               "link": "/setgame/cfgtemplate",
    //             },
    //             {
    //               "text": "用户操作",
    //               "hideInBreadcrumb": true,
    //               "link": "/setgame/setsdk",
    //             },


    //           ]
    //         },
    //         {
    //           "text": "平台管理",
    //           "hideInBreadcrumb": false,
    //           "icon": "anticon-setting",
    //           "children": [
    //             {
    //               "text": "用户管理",
    //               "hideInBreadcrumb": false,
    //               "link": "/system/peoplemamage",
    //             },
    //             {
    //               "text": "角色管理",
    //               "hideInBreadcrumb": false,
    //               "link": "/system/rolemamage",
    //             },
    //           ]
    //         },
    //         {
    //           "text": "个人中心",
    //           "hideInBreadcrumb": false,
    //           "icon": "anticon-user",
    //           "children": [
    //             {
    //               "text": "基本资料",
    //               "hideInBreadcrumb": false,
    //               "link": "/center/personal",
    //             },
    //             {
    //               "text": "修改密码",
    //               "hideInBreadcrumb": false,
    //               "link": "/center/resetpassword",
    //             },
    //           ]
    //         }
    //       ]
    //     }
    //   ]
    // );

    resolve({});
  }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      // http
      // this.viaHttp(resolve, reject);
      // mock：请勿在生产环境中这么使用，viaMock 单纯只是为了模拟一些数据使脚手架一开始能正常运行
      this.viaMock(resolve, reject);

    });
  }
}
