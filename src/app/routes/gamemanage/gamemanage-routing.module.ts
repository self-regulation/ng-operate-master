import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PictureManageComponent } from './picture-manage/picture-manage.component';
import { DeviceManageComponent } from './device-manage/device-manage.component';


const routes: Routes = [
    { path: 'picturemanage', component: PictureManageComponent },
    { path: 'devicemanage', component: DeviceManageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GameManageRoutingModule { }
