import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperationActionComponent } from './operation-action/operation-action.component';
import { ServerUpdateComponent } from './server-update/server-update.component';
import { ServerRecordComponent } from './server-record/server-record.component';


const routes: Routes = [
    { path: 'action', component: OperationActionComponent },
    {
        path: 'serverupdate', component: ServerUpdateComponent,
    },
    { path: 'serverrecord', component: ServerRecordComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OperationRoutingModule { }
