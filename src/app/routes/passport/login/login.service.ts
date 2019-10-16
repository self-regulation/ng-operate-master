import { Injectable } from '@angular/core';
import { HttpBaseService } from '@core/net/http-base.service';
import { AgentHttpParams } from '@core/net/agent-http-params';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
    constructor(private httpBaseService: HttpBaseService) {

    }

    doLogin(userInfo: any) {

        return new Observable((observer) => {
            const loginParams = new AgentHttpParams();
            loginParams.url = '/admin/login';
            userInfo.username = userInfo.username.replace(/^(\s*)|(\s*)$/g, '')
            loginParams.data = {
                validateCode: userInfo.validateCode,
                username: userInfo.username,
                password: userInfo.password,
            };
            loginParams.callback = ((response: any) => {
                observer.next(response);
            });
            this.httpBaseService.postData(loginParams);
        });
    }

    translateDataToTree(data) {
        // 没有父节点的数据
        let parents = data.filter(value => value.parentId == 0);
        parents[0].group = true;
        parents[0].hideInBreadcrumb = true;
        // parents["group"] = true;
        // parents["hideInBreadcrumb"] = true;
        // 有父节点的数据
        let children = data.filter(value => value.parentId !== 'undefined' && value.parentId != null || value.parentId != '');
        children.push(
            // {
            //     "createDate": "2019-08-28 08:10:27",
            //     "icon": null,
            //     "id": 22,
            //     "isShow": "1",
            //     "menukey": "DataAnalysis",
            //     "name": "数据分析",
            //     "parentId": 1,
            //     "parentIds": "0,1,",
            //     "permission": null,
            //     "remarks": "",
            //     "sort": 3,
            //     "updateDate": "2019-08-28 08:10:27",
            //     "userId": null
            // },
            {
                "createDate": "2019-08-28 08:10:27",
                "icon": null,
                "id": 22,
                "isShow": "1",
                "menukey": "UserRetain",
                "name": "用户留存",
                "parentId": 15,
                "parentIds": "0,1,15",
                "permission": null,
                "remarks": "",
                "sort": 2,
                "updateDate": "2019-08-28 08:10:27",
                "userId": null
            }
        );
        // 定义转换方法的具体实现
        let translator = (parents, children) => {
            // 遍历父节点数据
            parents.forEach((parent) => {
                // 遍历子节点数据
                children.forEach((current, index) => {
                    let newCurrent = {
                        id: current.id,
                        parentId: current.parentId,
                        text: current.name,
                        icon: '',
                        hideInBreadcrumb: false,
                        children: current.children,
                        menukey: current.menukey,
                        order: 0
                    };
                    switch (current.menukey) {
                        case "HomePage":    //首页
                            newCurrent.icon = "anticon-home";
                            newCurrent.order = 1;
                            break;
                        //首页---子项
                        case "CloudMonitor": //"云端监控"
                            newCurrent['link'] = "/dashboard";
                            newCurrent.order = 1;
                            break;
                        case "UserRetain": //"用户留存"
                            newCurrent['link'] = "/analysis/userRetain";
                            newCurrent.order = 2;
                            break;

                        case "DataAnalysis":    //数据分析
                            newCurrent.icon = "anticon-home";
                            newCurrent.order = 1;
                            break;
                        //数据分析---子项
                        case "UserRetain": //"用户留存"
                            newCurrent['link'] = "/dashboard";
                            newCurrent.order = 1;
                            break;

                        case "System":  //系统管理
                            newCurrent.icon = "anticon-setting";
                            newCurrent.order = 5;
                            break;
                        //系统管理---子项
                        case "UserManager": //用户管理
                            newCurrent['link'] = "/system/peoplemamage";
                            newCurrent.order = 1;
                            break;
                        case "RoleManager": //角色管理
                            newCurrent['link'] = "/system/rolemamage";
                            newCurrent.order = 2;
                            break;
                        case "MenuManager": //"菜单管理"
                            newCurrent['link'] = "/dashboard";
                            newCurrent.order = 3;
                            break;
                        case "LogManager"://操作日志
                            newCurrent['link'] = "/system/operatelog";
                            newCurrent.order = 4;
                            break;



                        case "Configuration":   //配置管理
                            newCurrent.icon = "anticon-tool";
                            newCurrent.order = 4;
                            break;
                        //配置管理---子项      
                        case "GameManager":   //"管理配置"
                            newCurrent['link'] = "/config/cfgtemplate";
                            newCurrent.order = 2;
                            break;
                        case "GameTask":   // "用户操作"
                            newCurrent['link'] = "/config/useraction";
                            newCurrent.order = 1;
                            break;

                        case "PersonInfo":  //个人中心
                            newCurrent.icon = "anticon-user";
                            newCurrent.order = 6;
                            break;

                        //个人中心---子项
                        case "UserBasicInfo":
                            newCurrent['link'] = "/center/personal";
                            newCurrent.order = 1;
                            break;
                        case "ModifyPassword":
                            newCurrent['link'] = "/center/resetpassword";
                            newCurrent.order = 2;
                            break;

                        case "Monitor": //实时监控
                            newCurrent.icon = "anticon-dashboard";
                            newCurrent.order = 2;
                            break;

                        //实时监控---子项
                        case "ServerManager":   //"服务器管理"
                            newCurrent['link'] = "/monitor/serviceManager";
                            newCurrent.order = 2;
                            break;
                        case "ServerMonitor":   //"服务器性能"
                            newCurrent['link'] = "/monitor/serviceMonitor";
                            newCurrent.order = 1;
                            break;
                        case "ProcessMonitor":   //"进程监控"
                            newCurrent['link'] = "/monitor/processMonitor";
                            newCurrent.order = 3;
                            break;


                        case "Operation":   //在线运维
                            newCurrent.icon = "anticon-desktop"
                            newCurrent.order = 3;
                            break;
                        //在线运维---子项
                        case "OperationManager":   //"运维操作"
                            newCurrent['link'] = "/operation/action";
                            newCurrent.order = 1;
                            break;
                        case "ServerLog":   //"服务器日志"
                            newCurrent['link'] = "/operation/serverlog";
                            newCurrent.order = 2;
                            break;



                    }
                    // 此时找到父节点对应的一个子节点
                    if (current.parentId === parent.id) {
                        // 对子节点数据进行深复制，这里只支持部分类型的数据深复制
                        let temp = JSON.parse(JSON.stringify(children))
                        // 让当前子节点从temp中移除，temp作为新的子节点数据，这里是为了让递归时，子节点的遍历次数更少，如果父子关系的层级越多，越有利
                        temp.splice(index, 1)
                        // 让当前子节点作为唯一的父节点，去递归查找其对应的子节点
                        translator([newCurrent], temp)
                        // 把找到子节点放入父节点的children属性中
                        if (newCurrent.menukey != 'MenuManager') {
                            typeof parent.children !== 'undefined' ? parent.children.push(newCurrent) :
                                parent.children = [newCurrent]
                        }
                    }
                });
            });
        };
        // 调用转换方法
        translator(parents, children);
        //菜单排序
        this.sortMenu(parents[0]);
        // 返回最终的结果    
        return parents;
    }

    sortMenu(menuData) {
        if (menuData.children) {
            menuData.children.sort((a, b) => a.order - b.order);
        }
        menuData.children.forEach((menu: any) => {
            if (!menu.children || menu.children.length < 0) {
                return;
            } else {
                this.sortMenu(menu);
            }
        });
    }

}





