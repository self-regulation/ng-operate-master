import { Component, TemplateRef, ViewChild, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
    selector: "notification-component",
    template: `
    <ng-template #notification let-notificationData="data">
            <div class="ant-notification-notice-content">
            <div class="ant-notification-notice-with-icon">
            <div class="ant-notification-notice-message"><i nz-icon nzType="message" nzTheme="outline" style="color:green;margin-right:5px;size:16px;"></i>消息通知头部</div>
            <div class="ant-notification-notice-description">
                消息通知内容。。。
            </div>
            </div>
            <div class="text-right"><button nz-button type="submit" [nzType]="'primary'" (click)="lookDetail(notificationData)">查看</button></div>
            </div>
    </ng-template>
    `

})
export class NotificationComponent {
    @ViewChild('notification', { static: false }) notificationTemplate: TemplateRef<{}>;
    constructor(private notification: NzNotificationService) {

    }
    ngAfterViewInit(): void {

    }
    public createBasicNotification(notificationData: any): void {

        this.notification.template(this.notificationTemplate, {
            nzData: notificationData
        });
    }

    lookDetail(event) {
        console.log(event);
    }

}