import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PictureManageComponent } from './picture-manage/picture-manage.component';


const routes: Routes = [
    { path: 'picturemanage', component: PictureManageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GameManageRoutingModule { }
