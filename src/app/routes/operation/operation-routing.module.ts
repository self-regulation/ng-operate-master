import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperationActionComponent } from './operation-action/operation-action.component';
import { DeviceManageComponent } from './device-manage/device-manage.component';
import { ServerUpdateComponent } from './server-update/server-update.component';
import { ServerRecordComponent } from './server-record/server-record.component';


const routes: Routes = [
    { path: 'action', component: OperationActionComponent },
    { path: 'devicemanage', component: DeviceManageComponent },
    {
        path: 'serverupdate', component: ServerUpdateComponent,
        // children: [{
        //     path: 'serverrecord',
        //     component: ServerRecordComponent
        // }]
    },
    { path: 'serverrecord', component: ServerRecordComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OperationRoutingModule { }
