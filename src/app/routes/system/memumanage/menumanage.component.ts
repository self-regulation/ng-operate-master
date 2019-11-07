import { Component, OnInit } from '@angular/core';
import { MenuManageServer } from './menumanage.server';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { positiveValidator, alphaValidator } from '@shared';
import { MenuService } from '@delon/theme';
import { StorageService } from '@core/storage/storage.service';

@Component({
    selector: 'menu-manage',
    templateUrl: './menumanage.component.html',
    styleUrls: ['./menumanage.component.less'],
    providers: [MenuManageServer]
})
export class MenumanageComponent implements OnInit {
    menuList: any = [];
    newMenuList: any = [];
    modalTitle: any = '新增菜单';
    menuVisible: boolean = false;
    modalLoading: boolean = false;
    menuModalForm: FormGroup;
    menumanageForm: FormGroup;
    tableLoading: boolean = false;
    isSecond: boolean = true;
    // parentId: any = '';
    constructor(private menuManageServer: MenuManageServer, private message: NzMessageService, private fb: FormBuilder, private menuService: MenuService, private storageService: StorageService) {

    }
    ngOnInit(): void {
        this.menumanageForm = this.fb.group({
            name: [null],
        });

        this.menuModalForm = this.fb.group({
            parentId: [null],
            parentName: [null],
            name: [null, [Validators.required]],
            sort: [null, [Validators.required, positiveValidator]],
            menukey: [null, [Validators.required, alphaValidator]],
            icon: [null],
            isShow: ['1', [Validators.required]],
            remarks: [null],
        });

        this.getMenuList();
        // this.saveOrUpdateMenu();
    }
    searchData() {
        this.getMenuList();
    }
    getMenuList() {
        this.tableLoading = true;
        let params = {
            name: this.menumanageForm.value.name ? this.menumanageForm.value.name : null
        };
        this.menuManageServer.getMenuList(params).subscribe((res: any) => {
            console.log(res);
            this.tableLoading = false;
            if (res.code == 0) {
                this.menuList = [];
                this.newMenuList = res.data;
                res.data.forEach((item: any, index) => {
                    if (index == 0) {
                        item['groupExpand'] = true;
                    } else {
                        item['groupExpand'] = false;
                    }
                    this.menuList.push(item);
                });

            } else {
                this.message.create('error', res.message ? res.message : '查询失败!');
            }
        });
    }

    saveOrUpdateMenu() {
        this.menuManageServer.saveMenu({
            parentId: 2,
            name: "测试菜单",
            menukey: "ceshiMenu",
            icon: "ceshi_icon",
            isShow: true,
            sort: 5,
            remarks: "param.remarks"
        }).subscribe((res: any) => {
            console.log(res);
        });
    }
    //删除一级菜单
    deleteFirstMenu(dataId) {
        this.menuManageServer.deleteMenu({
            id: dataId
        }).subscribe((res: any) => {
            if (res.code == 0) {
                this.message.create('success', res.message ? res.message : '操作成功!');
            } else {
                this.message.create('error', res.message ? res.message : '操作失败!');
            }
            this.getMenuList();
        });

    }
    //删除二级菜单
    deleteSecondMenu(dataId) {
        console.log(dataId);
        this.menuManageServer.deleteMenu({
            id: dataId
        }).subscribe((res: any) => {
            if (res.code == 0) {
                this.getMenuList();
                this.message.create('success', res.message ? res.message : '操作成功!');
                // this.resetMenu();
            } else {
                this.message.create('error', res.message ? res.message : '操作失败!');
            }

        });
    }
    //添加二级菜单
    addFirstManu() {
        this.modalTitle = "添加一级菜单";
        this.isSecond = false;
        this.menuModalForm = this.fb.group({
            parentId: [1],
            name: [null, [Validators.required]],
            sort: [null, [Validators.required, positiveValidator]],
            menukey: [null, [Validators.required, alphaValidator]],
            icon: [null],
            isShow: ['1', [Validators.required]],
            remarks: [null],
        });
        this.menuVisible = true;
    }
    //添加二级菜单
    addSecondMenu(menuData) {
        this.isSecond = true;
        this.modalTitle = "添加二级菜单";
        this.menuModalForm = this.fb.group({
            parentId: [menuData.id],
            parentName: [menuData.name],
            name: [null, [Validators.required]],
            sort: [null, [Validators.required, positiveValidator]],
            menukey: [null, [Validators.required, alphaValidator]],
            icon: [null],
            isShow: ['1', [Validators.required]],
            remarks: [null],
        });
        this.menuVisible = true;
    }
    //修改二级菜单
    modifySecondMenu(parentName, menuData) {
        console.log(menuData);
        this.modalTitle = "修改二级菜单";
        this.isSecond = true;
        this.menuModalForm = this.fb.group({
            id: [menuData.id],
            parentId: [menuData.parentId],
            parentName: [parentName],
            name: [menuData.name, [Validators.required]],
            sort: [menuData.sort, [Validators.required, positiveValidator]],
            menukey: [menuData.menukey, [Validators.required, alphaValidator]],
            icon: [menuData.icon],
            isShow: [menuData.isShow, [Validators.required]],
            remarks: [menuData.remarks],
        });
        this.menuVisible = true;

    }
    //修改一级菜单
    modifyFirstMenu(isSecond, menuData) {
        this.modalTitle = "修改一级菜单";
        this.isSecond = isSecond;
        console.log(menuData);
        this.menuModalForm = this.fb.group({
            id: [menuData.id],
            parentId: [menuData.parentId],
            name: [menuData.name, [Validators.required]],
            sort: [menuData.sort, [Validators.required, positiveValidator]],
            menukey: [menuData.menukey, [Validators.required, alphaValidator]],
            icon: [menuData.icon],
            isShow: [menuData.isShow, [Validators.required]],
            remarks: [menuData.remarks],
        });
        this.menuVisible = true;
    }

    menuModalCancel() {
        this.menuVisible = false;
        this.isSecond = true;
    }

    menuModalOk() {
        for (const i in this.menuModalForm.controls) {
            this.menuModalForm.controls[i].markAsDirty();
            this.menuModalForm.controls[i].updateValueAndValidity();
        }
        if (this.menuModalForm.status === "INVALID") {
            console.log(this.menuModalForm);
            this.message.create('warring', '请检查数据合法性!');
            return
        }
        this.menuManageServer.saveMenu(this.menuModalForm.value).subscribe((res: any) => {
            console.log(res);
            if (res.code == 0) {
                this.message.create('success', res.message ? res.message : '操作成功!');
                // this.resetMenu();
            } else {
                this.message.create('error', res.message ? res.message : '操作失败!');
            }
            this.getMenuList();
            this.menuVisible = false;
        });


    }
    //重置菜单列表
    resetMenu() {

        let rootBean = {
            "id": 1,
            "remarks": "",
            "createDate": "2019-01-01 01:00:00",
            "updateDate": "2019-01-01 01:00:00",
            "parentIds": "0,",
            "name": "功能菜单",
            "menukey": "Root",
            "icon": null,
            "sort": 0,
            "isShow": "1",
            "permission": null,
            "userId": null,
            "parentId": 0,
            "group": true,
            "hideInBreadcrumb": true,
            "children": []
        };

        this.newMenuList.forEach((item: any) => {
            console.log(item);
            let newCurrent = {
                id: item.id,
                parentId: item.parentId,
                text: item.name,
                icon: '',
                hideInBreadcrumb: false,
                children: [],
                menukey: item.menukey,
                order: 0
            };
            switch (item.menukey) {
                case "HomePage":    //首页
                    newCurrent.icon = "anticon-home";
                    newCurrent.order = 1;
                    break;

                case "System":  //系统管理
                    newCurrent.icon = "anticon-setting";
                    newCurrent.order = 5;
                    break;

                case "Configuration":   //配置管理
                    newCurrent.icon = "anticon-tool";
                    newCurrent.order = 4;
                    break;

                case "PersonInfo":  //个人中心
                    newCurrent.icon = "anticon-user";
                    newCurrent.order = 6;
                    break;

                case "Monitor": //实时监控
                    newCurrent.icon = "anticon-dashboard";
                    newCurrent.order = 2;
                    break;

                case "Operation":   //在线运维
                    newCurrent.icon = "anticon-desktop"
                    newCurrent.order = 3;
                    break;
            }
            if (item.menuChildList && item.menuChildList.length > 0) {
                item.menuChildList.forEach((result: any) => {
                    let childCurrent = {
                        id: result.id,
                        parentId: result.parentId,
                        text: result.name,
                        icon: '',
                        hideInBreadcrumb: false,
                        children: '',
                        menukey: result.menukey,
                        order: 0
                    };

                    switch (result.menukey) {

                        case "CloudMonitor": //"云端监控"
                            childCurrent['link'] = "/dashboard";
                            childCurrent.order = 1;
                            break;
                        case "userRetention": //"用户留存"
                            childCurrent['link'] = "/analysis/userRetain";
                            childCurrent.order = 2;
                            break;


                        case "UserManager": //用户管理
                            childCurrent['link'] = "/system/peoplemamage";
                            childCurrent.order = 1;
                            break;
                        case "RoleManager": //角色管理
                            childCurrent['link'] = "/system/rolemamage";
                            childCurrent.order = 2;
                            break;
                        case "MenuManager": //"菜单管理"
                            childCurrent['link'] = "/system/menumanage";
                            childCurrent.order = 3;
                            break;
                        case "LogManager"://操作日志
                            childCurrent['link'] = "/system/operatelog";
                            childCurrent.order = 4;
                            break;


                        //配置管理---子项      
                        case "GameManager":   //"管理配置"
                            childCurrent['link'] = "/config/cfgtemplate";
                            childCurrent.order = 2;
                            break;
                        case "GameTask":   // "用户操作"
                            childCurrent['link'] = "/config/useraction";
                            childCurrent.order = 1;
                            break;

                        //个人中心---子项
                        case "UserBasicInfo":
                            childCurrent['link'] = "/center/personal";
                            childCurrent.order = 1;
                            break;
                        case "ModifyPassword":
                            childCurrent['link'] = "/center/resetpassword";
                            childCurrent.order = 2;
                            break;

                        //实时监控---子项
                        case "ServerManager":   //"服务器管理"
                            childCurrent['link'] = "/monitor/serviceManager";
                            childCurrent.order = 2;
                            break;
                        case "ServerMonitor":   //"服务器性能"
                            childCurrent['link'] = "/monitor/serviceMonitor";
                            childCurrent.order = 1;
                            break;
                        case "ProcessMonitor":   //"进程监控"
                            childCurrent['link'] = "/monitor/processMonitor";
                            childCurrent.order = 3;
                            break;

                        //在线运维---子项
                        case "OperationManager":   //"运维操作"
                            childCurrent['link'] = "/operation/action";
                            childCurrent.order = 1;
                            break;
                        case "ServerLog":   //"服务器日志"
                            childCurrent['link'] = "/operation/serverlog";
                            childCurrent.order = 2;
                            break;
                        case 'PictureManager': //画质管理
                            childCurrent['link'] = "/operation/picturemanage";
                            childCurrent.order = 3;
                            break;
                        case 'DeviceManager': //设备管理
                            childCurrent['link'] = "/operation/devicemanage";
                            childCurrent.order = 4;
                            break;


                    }

                    newCurrent.children.push(childCurrent);
                });
            }

        });

        rootBean.children = this.newMenuList;


        this.menuService.clear();
        let menuList: Array<any> = [];
        menuList.push(rootBean);
        if (this.menuService.menus.length <= 0) {
            console.log('@@@@');
            console.log(this.menuService.menus);
            // this.menuService.add(menuList);
            console.log('@@@@添加后');
            console.log(this.menuService.menus);
            // this.menuService.resume();
        }

        this.storageService.saveMenuInfo(menuList);
        console.log(this.storageService.getMenuInfo());
        // this.menuService.add(menuList);

    }

    changeShowType() {

    }
}