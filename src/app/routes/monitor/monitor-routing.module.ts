import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceMonitorComponent } from './serviceMonitor/serviceMonitor.component';
import { ServiceComponent } from './serviceManager/service.component';
import { ProcessMonitorComponent } from './processMonitor/processMonitor.component';


const routes: Routes = [
    { path: 'serviceManager', component: ServiceComponent },
    { path: 'serviceMonitor', component: ServiceMonitorComponent },
    { path: 'processMonitor', component: ProcessMonitorComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MonitorModuleRoot { }
