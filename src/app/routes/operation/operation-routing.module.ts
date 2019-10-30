import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperationActionComponent } from './operation-action/operation-action.component';
import { ServerlogComponent } from './server-log/server-log.component';
import { PictureManageComponent } from './picture-manage/picture-manage.component';
import { DeviceManageComponent } from './device-manage/device-manage.component';


const routes: Routes = [
    { path: 'action', component: OperationActionComponent },
    { path: 'serverlog', component: ServerlogComponent },
    { path: 'picturemanage', component: PictureManageComponent },
    { path: 'devicemanage', component: DeviceManageComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OperationRoutingModule { }
