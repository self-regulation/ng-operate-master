import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { OperationRoutingModule } from './operation-routing.module';
import { OperationActionComponent } from './operation-action/operation-action.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { DeviceManageComponent } from './device-manage/device-manage.component';
import { ServerUpdateComponent } from './server-update/server-update.component';
import { NzBadgeModule } from 'ng-zorro-antd';


const THIRDMODULES = [NzBreadCrumbModule, NzBadgeModule, NzDatePickerModule];


const COMPONENTS = [OperationActionComponent, DeviceManageComponent, ServerUpdateComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [SharedModule, OperationRoutingModule, ...THIRDMODULES],
    exports: [...THIRDMODULES],
    providers: [],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    entryComponents: COMPONENTS_NOROUNT,
})
export class OperationModule { }

