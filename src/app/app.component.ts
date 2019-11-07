import { Component, OnInit } from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';
// import { filter } from 'rxjs/operators';
// import { VERSION as VERSION_ZORRO, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  constructor(
  ) {
    // renderer.setAttribute(el.nativeElement, 'ng-alain-version', VERSION_ALAIN.full);
    // renderer.setAttribute(el.nativeElement, 'ng-zorro-version', VERSION_ZORRO.full);
  }

  ngOnInit() {
    // this.router.events.pipe(filter(evt => evt instanceof NavigationEnd)).subscribe(() => {
    //   this.titleSrv.setTitle();
    //   this.modalSrv.closeAll();
    // });
    // let menuList = this.storageService.getMenuInfo();
    // if (this.menuService.menus.length <= 0 && menuList != '{}') {
    // this.menuService.add(menuList);
    // }

  }
}
