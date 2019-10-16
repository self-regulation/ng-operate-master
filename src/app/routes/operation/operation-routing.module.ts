import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperationActionComponent } from './operation-action/operation-action.component';
import { ServerlogComponent } from './server-log/server-log.component';


const routes: Routes = [
    { path: 'action', component: OperationActionComponent },
    { path: 'serverlog', component: ServerlogComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OperationRoutingModule { }
