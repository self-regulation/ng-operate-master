import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AnalysisModuleRoot } from './analysis-routing.module';
import { UserRetainComponent } from './userretain/user-retain.component';
import { UserListComponent } from './userList/user-list.component';
import { UserDetailComponent } from './userDetail/user-detail.component';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NgxEchartsModule } from 'ngx-echarts';

const COMPONENTS = [UserRetainComponent, UserListComponent, UserDetailComponent];
const COMPONENTS_NOROUNT = [];
const THIRDMODULES = [NzDatePickerModule, NzBreadCrumbModule, NzTimelineModule, NgxEchartsModule];

@NgModule({
    imports: [SharedModule, AnalysisModuleRoot, ...THIRDMODULES],
    exports: [...THIRDMODULES],
    providers: [],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    entryComponents: COMPONENTS_NOROUNT,
})
export class AnalysisModule { }
