import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { MonitorModuleRoot } from './monitor-routing.module';
import { ServiceMonitorComponent } from './serviceMonitor/serviceMonitor.component';
import { ProcessMonitorComponent } from './processMonitor/processMonitor.component';

import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { UserGameComponent } from './userGame/userGame.component';
import { ExceptionLogComponent } from './exception-log/exception-log.component';
import { ServerlogComponent } from './server-log/server-log.component';


const THIRDMODULES = [NzBreadCrumbModule, NzBadgeModule, NzDatePickerModule];

const COMPONENTS = [ServiceMonitorComponent, ProcessMonitorComponent, UserGameComponent, ExceptionLogComponent, ServerlogComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [SharedModule, MonitorModuleRoot, ...THIRDMODULES],
    exports: [...THIRDMODULES],
    providers: [],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    entryComponents: COMPONENTS_NOROUNT,
})
export class MonitorModule { }
