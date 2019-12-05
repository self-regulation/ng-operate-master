import { Component, OnInit, ViewChild, TemplateRef, HostListener, ElementRef } from '@angular/core';
import { WebsocketService } from '@core/websocket/websocket.service';
import { NotificationComponent } from '@core/notification/notification.component';
import { NzNotificationService } from 'ng-zorro-antd';
import { StorageService } from '@core/storage/storage.service';
import { MenuService } from '@delon/theme';
// import { Router, NavigationEnd } from '@angular/router';
// import { filter } from 'rxjs/operators';
// import { VERSION as VERSION_ZORRO, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <notification-component #tpl></notification-component>
  `,
})
export class AppComponent implements OnInit {
  @ViewChild("tpl", { static: false }) notificationCom: NotificationComponent;

  constructor(
    private webSocketService: WebsocketService,
    private notification: NzNotificationService,
    private storageService: StorageService,
    private menuService: MenuService) {
    // renderer.setAttribute(el.nativeElement, 'ng-alain-version', VERSION_ALAIN.full);
    // renderer.setAttribute(el.nativeElement, 'ng-zorro-version', VERSION_ZORRO.full);
  }

  ngOnInit() {
    let menuList = this.storageService.getMenuInfo();
    if (this.menuService.menus.length <= 0 && menuList != '{}') {
      this.menuService.add(menuList);
    } else {

    }
    // 接收消息
    // this.webSocketService.messageSubject.subscribe(
    //   data => {
    //     console.log(data);
    //   },
    //   err => {
    //     console.log(err);
    //   },
    //   () => { console.log('@@@@@@') }
    // );

  }
  ngAfterViewInit(): void {
    // this.notificationCom.createBasicNotification({
    //   qq: 111,
    //   rrr: 777
    // });
  }
}
