import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { MonitorModuleRoot } from './monitor-routing.module';
import { ServiceMonitorComponent } from './serviceMonitor/serviceMonitor.component';
import { ServiceComponent } from './serviceManager/service.component';
import { ProcessMonitorComponent } from './processMonitor/processMonitor.component';

import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';


const THIRDMODULES = [NzBreadCrumbModule, NzBadgeModule];

const COMPONENTS = [ServiceComponent, ServiceMonitorComponent, ProcessMonitorComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [SharedModule, MonitorModuleRoot, ...THIRDMODULES],
    exports: [...THIRDMODULES],
    providers: [],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    entryComponents: COMPONENTS_NOROUNT,
})
export class MonitorModule { }
