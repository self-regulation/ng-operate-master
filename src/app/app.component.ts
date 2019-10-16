import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';
// import { filter } from 'rxjs/operators';
import { VERSION as VERSION_ALAIN, TitleService, MenuService } from '@delon/theme';
// import { VERSION as VERSION_ZORRO, NzModalService } from 'ng-zorro-antd';
import { StorageService } from '@core/storage/storage.service';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  constructor(
    // el: ElementRef,
    // renderer: Renderer2,
    // private router: Router,
    // private titleSrv: TitleService,
    // private modalSrv: NzModalService,
    private menuService: MenuService,
    private storageService: StorageService
  ) {
    // renderer.setAttribute(el.nativeElement, 'ng-alain-version', VERSION_ALAIN.full);
    // renderer.setAttribute(el.nativeElement, 'ng-zorro-version', VERSION_ZORRO.full);
  }

  ngOnInit() {
    // this.router.events.pipe(filter(evt => evt instanceof NavigationEnd)).subscribe(() => {
    //   this.titleSrv.setTitle();
    //   this.modalSrv.closeAll();
    // });
    let menuList = this.storageService.getMenuInfo();
    if (this.menuService.menus.length <= 0 && menuList != '{}') {
      this.menuService.add(menuList);
    }

  }
}
