import { Injectable, Injector, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN } from '@delon/theme';
// import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ACLService } from '@delon/acl';

import { NzIconService } from 'ng-zorro-antd/icon';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { ICONS } from '../../../style-icons';
import { StorageService } from '@core/storage/storage.service';

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
    private storageService: StorageService
    // @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  private viaHttp(resolve: any, reject: any) {
    console.log('@@@@@@@@@@@@@@@@@@11111111111');

    // zip(
    //   this.httpClient.get('assets/tmp/app-data.json')
    // ).pipe(
    //   catchError(([appData]) => {
    //     resolve(null);
    //     return [appData];
    //   })
    // ).subscribe(([appData]) => {
    //   console.log('@@@@@@@@@@@@@@@@@@');
    //   console.log(appData);
    //   // Application data
    //   const res: any = appData;
    //   // Application information: including site name, description, year
    //   this.settingService.setApp(res.app);
    //   // User information: including name, avatar, email address
    //   this.settingService.setUser(res.user);
    //   // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
    //   // this.aclService.setFull(true);
    //   this.aclService.set(['admin']);
    //   // Menu data, https://ng-alain.com/theme/menu
    //   // this.menuService.add(res.menu);
    //   // Can be set page suffix title, https://ng-alain.com/theme/title
    //   this.titleService.suffix = res.app.name;
    // },
    //   () => { },
    //   () => {
    //     resolve(null);
    //   });
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
    this.aclService.setRole(['admin']);
    // this.aclService.setFull(true);
    this.settingService.setApp(app);
    this.settingService.setUser(user);
    this.titleService.suffix = app.name;
    resolve({});
  }

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      // console.log("startup---load");
      // let userInfo = this.storageService.getUserInfo();
      // // if (!userInfo) {
      // //   resolve({});
      // // }
      const app: any = {
        name: `云游戏`,
        description: `云游戏运营管理平台`
      };
      const user: any = {
        name: 'admin',
        avatar: './assets/tmp/img/avatar.jpg',
        email: 'userInfo.email'
      };
      // console.log("用户的信息@@@@@@@@@");
      // console.log(userInfo);
      // this.aclService.setRole(['admin']);
      this.aclService.setFull(true);
      this.settingService.setApp(app);
      this.settingService.setUser(user);
      this.titleService.suffix = app.name;
      console.log('((((9999999');
      resolve({});
    });
  }
}
