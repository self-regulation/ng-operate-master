import { Component, OnInit } from '@angular/core';
import { MenuManageServer } from './menumanage.server';

@Component({
    selector: 'menu-manage',
    templateUrl: './menumanage.component.html',
    providers: [MenuManageServer]
})
export class MenumanageComponent implements OnInit {
    constructor(private menuManageServer: MenuManageServer) {

    }
    ngOnInit(): void {
        this.getMenuList();
    }
    getMenuList() {
        this.menuManageServer.getMenuList().subscribe((res: any) => {
            console.log(res);
        });
    }
}