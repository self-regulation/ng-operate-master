import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperationActionComponent } from './operation-action/operation-action.component';
import { DeviceManageComponent } from './device-manage/device-manage.component';
import { ServerUpdateComponent } from './server-update/server-update.component';


const routes: Routes = [
    { path: 'action', component: OperationActionComponent },
    { path: 'devicemanage', component: DeviceManageComponent },
    { path: 'serverupdate', component: ServerUpdateComponent }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OperationRoutingModule { }
