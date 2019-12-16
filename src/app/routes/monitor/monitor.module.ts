import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { MonitorModuleRoot } from './monitor-routing.module';
import { ServiceMonitorComponent } from './serviceMonitor/serviceMonitor.component';
import { ProcessMonitorComponent } from './processMonitor/processMonitor.component';

import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { UserGameComponent } from './userGame/userGame.component';
import { NgxEchartsModule } from 'ngx-echarts';


const THIRDMODULES = [NzBreadCrumbModule, NzBadgeModule, NzDatePickerModule, NgxEchartsModule];

const COMPONENTS = [ServiceMonitorComponent, ProcessMonitorComponent, UserGameComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [SharedModule, MonitorModuleRoot, ...THIRDMODULES],
    exports: [...THIRDMODULES],
    providers: [],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    entryComponents: COMPONENTS_NOROUNT,
})
export class MonitorModule { }
