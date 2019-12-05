import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { SettingsService, MenuService } from '@delon/theme';
import { StorageService } from '@core/storage/storage.service';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {

  searchToggleStatus: boolean;

  constructor(public settings: SettingsService, private menuService: MenuService,
    private storageService: StorageService) { }

  ngOnInit(): void {
    // let menuList = this.storageService.getMenuInfo();
    // console.log("存储的menuList");
    // console.log(menuList);
    // if (this.menuService.menus.length <= 0 && menuList != '{}') {
    //   this.menuService.add(menuList);
    // }
  }
  toggleCollapsedSidebar() {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  }

  searchToggleChange() {
    this.searchToggleStatus = !this.searchToggleStatus;
  }
}
