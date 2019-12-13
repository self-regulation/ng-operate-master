import { Component, OnInit } from '@angular/core';
import { MenuAuthorizationService } from './menu-authorization.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: "menu-authorization",
    templateUrl: "./menu-authorization.component.html",
    providers: [MenuAuthorizationService],
    styleUrls: ["./menu-authorization.component.less"]
})
export class MenuAuthorizationComponent implements OnInit {
    roleMenuList: any = [];
    menuList: any = [];
    tableLoading: boolean = false;
    roleId: any;
    modalTitle: any = "添加一级菜单权限";
    menuVisible: boolean = false;
    modalLoading: boolean = false;
    modalMenuList: any = [];  //菜单权限列表
    addMenuList: any = [];
    selectRoleIndex: any = null;
    constructor(private menuAuthorizationService: MenuAuthorizationService, private message: NzMessageService) {

    }

    ngOnInit(): void {
        // this.menuAuthorizationService.getAllRole().subscribe((res: any) => {
        //     console.log(res);
        // });
        this.getAllRoleOfMenu();
    }

    getAllRoleOfMenu() {
        this.tableLoading = true;
        this.menuAuthorizationService.getAllRoleOfMenu().subscribe((res: any) => {
            this.tableLoading = false;
            console.log(res);
            if (res.code == 0) {
                this.menuList = [];
                this.roleMenuList = res.data;
                if (!this.selectRoleIndex) {
                    this.selectRoleIndex = 0;
                }
                if (res.data.length > 0) {
                    this.roleId = res.data[this.selectRoleIndex].id;
                    res.data[this.selectRoleIndex].menuList.forEach((item: any, index) => {
                        if (index == 0) {
                            item['groupExpand'] = true;
                        } else {
                            item['groupExpand'] = false;
                        }
                        this.menuList.push(item);
                    });
                }

                console.log(this.roleMenuList);
            } else {
                this.message.create('error', res.message ? res.message : '查询失败!');
            }
        });
    }

    selectMenu(menu: any, menuIndex) {
        console.log(menu);
        this.menuList = [];
        this.roleId = menu.id;
        this.selectRoleIndex = menuIndex;
        if (menu.menuList && menu.menuList.length > 0) {
            menu.menuList.forEach((item: any, index) => {
                if (index == 0) {
                    item['groupExpand'] = true;
                } else {
                    item['groupExpand'] = false;
                }
                this.menuList.push(item);
            });
        }

    }

    //获取一级菜单
    addFirstManu() {
        this.addMenuList = [];
        this.modalMenuList = [];
        this.modalLoading = true;
        this.modalTitle = "添加一级菜单权限";
        this.menuAuthorizationService.getMenuListFirstNav().subscribe((res: any) => {
            this.modalLoading = false;
            if (res.code == 0) {
                let curRoleMenuList = this.roleMenuList.filter((item: any) => {
                    return item.id == this.roleId;
                });

                if (res.data.length > 0) {
                    this.modalMenuList = res.data;
                    if (curRoleMenuList[0].menuList.length > 0) {
                        this.modalMenuList.forEach((fItem: any, index) => {

                            curRoleMenuList[0].menuList.forEach((cItem: any) => {

                                if (fItem.id == cItem.id) {
                                    console.log(fItem.id);
                                    delete this.modalMenuList[index];
                                }
                            });
                        });
                    }
                    this.modalMenuList = this.modalMenuList.filter((item: any) => {
                        if (item) {
                            return item;
                        }
                    });
                    if (this.modalMenuList.length > 0) {
                        this.menuVisible = true;
                    } else {
                        this.message.create('warnning', '你已经拥有所有一级菜单权限，无需添加!');
                    }
                    console.log(this.modalMenuList);
                }

                // let curFirstMenuList = curRoleMenuList[0].menuList.filter((ite));
            }
        });
    }

    //添加二级菜单权限
    addSecondMenu(parentId: any, menuChildList: any) {
        this.addMenuList = [];
        this.modalMenuList = [];
        let params = {
            parentId: parentId
        };
        this.modalLoading = true;
        this.modalTitle = "添加二级菜单权限";
        this.menuAuthorizationService.getChildMenuList(params).subscribe((res: any) => {
            this.modalLoading = false;
            // this.getArrDifference(res.data, menuChildList);
            if (res.code == 0) {
                if (res.data.length > 0) {
                    this.modalMenuList = res.data;
                    console.log(this.modalMenuList);
                    console.log(menuChildList);
                    if (menuChildList && menuChildList.length > 0) {
                        res.data.forEach((fItem: any, index) => {
                            menuChildList.forEach((cItem: any) => {

                                if (fItem.id == cItem.id) {
                                    delete this.modalMenuList[index];
                                    // this.modalMenuList.splice(index, 1);
                                }
                            });
                        });
                    }

                    this.modalMenuList = this.modalMenuList.filter((item: any) => {
                        if (item) {
                            return item;
                        }
                    });
                    if (this.modalMenuList.length > 0) {
                        this.menuVisible = true;
                    } else {
                        this.message.create('warnning', '你已经拥有该菜单所有权限，无需添加!');
                    }
                    console.log(this.modalMenuList);
                }
            }
        });
    }

    //删除菜单权限
    deleteRoleOfMenu(menuId) {
        let params = {
            roleId: this.roleId,
            menuId: menuId
        }

        this.menuAuthorizationService.deleteRoleOfMenu(params).subscribe((res: any) => {
            if (res.code == 0) {
                this.getAllRoleOfMenu();
                this.message.create('error', res.message ? res.message : '操作成功!');
            } else {
                this.message.create('error', res.message ? res.message : '操作失败!');
            }
        });
    }

    menuModalCancel() {
        this.menuVisible = false;
    }

    menuModalOk() {
        if (this.addMenuList.length == 0) {
            this.message.create('warnning', '请勾选菜单项!');
            return;
        }
        let params = {
            roleId: this.roleId,
            menuIds: this.addMenuList
        };
        this.menuAuthorizationService.addRoleOfMenu(params).subscribe((res: any) => {
            this.menuVisible = false;
            if (res.code == 0) {
                this.getAllRoleOfMenu();
                this.message.create('success', res.message ? res.message : '操作成功!');
            } else {
                this.message.create('error', res.message ? res.message : '操作失败!');
            }
        });
    }

    pickMenuList(value: string[]) {
        console.log(value);
        this.addMenuList = value;
    }

    getArrDifference(arr1, arr2) {
        let arra = arr1.map((item: any) => {

        });
        return arr1.concat(arr2).filter(function (v, i, arr) {
            // return arr.indexOf(v) === arr.lastIndexOf(v);
            console.log(v);
            console.log(i);
            console.log(arr);
            console.log("-------------------------------");
            console.log(arr.indexOf(v));
            console.log(arr.lastIndexOf(v));
        });
    }

}