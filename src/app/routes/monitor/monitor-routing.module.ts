import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceMonitorComponent } from './serviceMonitor/serviceMonitor.component';
import { ProcessMonitorComponent } from './processMonitor/processMonitor.component';
import { UserGameComponent } from './userGame/userGame.component';


const routes: Routes = [
    { path: 'serviceMonitor', component: ServiceMonitorComponent },
    { path: 'processMonitor', component: ProcessMonitorComponent },
    { path: 'userGameMonitor', component: UserGameComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MonitorModuleRoot { }
