import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { OperationRoutingModule } from './operation-routing.module';
import { OperationActionComponent } from './operation-action/operation-action.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ServerUpdateComponent } from './server-update/server-update.component';
import { NzBadgeModule, NzTimelineModule } from 'ng-zorro-antd';
import { ServerRecordComponent } from './server-record/server-record.component';


const THIRDMODULES = [NzBreadCrumbModule, NzBadgeModule, NzDatePickerModule, NzTimelineModule];


const COMPONENTS = [OperationActionComponent, ServerUpdateComponent, ServerRecordComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [SharedModule, OperationRoutingModule, ...THIRDMODULES],
    exports: [...THIRDMODULES],
    providers: [],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    entryComponents: COMPONENTS_NOROUNT,
})
export class OperationModule { }

