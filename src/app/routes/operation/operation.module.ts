import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { OperationRoutingModule } from './operation-routing.module';
import { OperationActionComponent } from './operation-action/operation-action.component';
import { ServerlogComponent } from './server-log/server-log.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { PictureManageComponent } from './picture-manage/picture-manage.component';
import { DeviceManageComponent } from './device-manage/device-manage.component';
import { ServerUpdateComponent } from './server-update/server-update.component';
import { ExceptionLogComponent } from './exception-log/exception-log.component';
import { RechargeUserComponent } from './recharge-user/recharge-user.component';
import { GameBillComponent } from './game-bill/game-bill.component';


const THIRDMODULES = [NzBreadCrumbModule, NzDatePickerModule];


const COMPONENTS = [OperationActionComponent, ServerlogComponent, PictureManageComponent, DeviceManageComponent, ServerUpdateComponent, ExceptionLogComponent, RechargeUserComponent, GameBillComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [SharedModule, OperationRoutingModule, ...THIRDMODULES],
    exports: [...THIRDMODULES],
    providers: [],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    entryComponents: COMPONENTS_NOROUNT,
})
export class OperationModule { }

