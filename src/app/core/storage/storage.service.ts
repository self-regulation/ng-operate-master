import { Injectable } from '@angular/core';
const MENU_PERMISSIONS: any = 'MENU_PERMISSIONS';
const USER_INFO: string = 'USER_INFO';
const MENU_INFO: string = 'MENU_INFO';
@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() {

    }
    private setStorageValue(key: string, value: any) {
        localStorage.setItem(key, value);
    }

    private getStorageValue(key: string, defaultValue?: any) {
        return localStorage.getItem(key) || defaultValue || '';
    }

    private setStorageObject(key: string, object: any) {
        localStorage.setItem(key, JSON.stringify(object));
    }

    private getStorageObject(key: string, defaultValue?: any) {
        return JSON.parse(this.getStorageValue(key) || defaultValue || '{}');
    }

    private clearStorageValue(key: string) {
        localStorage.removeItem(key);
    }

    // 保存用户信息
    saveUserInfo(userInfo: any) {
        this.setStorageObject(USER_INFO, userInfo);
    }
    getUserInfo() {
        return this.getStorageObject(USER_INFO, '{}');
    }

    //保存菜单数据
    saveMenuInfo(menuInfo: any) {
        this.setStorageObject('MENU_INFO', menuInfo);
    }
    getMenuInfo() {
        return this.getStorageObject('MENU_INFO', '{}');
    }

}