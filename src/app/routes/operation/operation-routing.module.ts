import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperationActionComponent } from './operation-action/operation-action.component';
import { ServerlogComponent } from './server-log/server-log.component';
import { PictureManageComponent } from './picture-manage/picture-manage.component';
import { DeviceManageComponent } from './device-manage/device-manage.component';
import { ServerUpdateComponent } from './server-update/server-update.component';
import { ExceptionLogComponent } from './exception-log/exception-log.component';
import { RechargeUserComponent } from './recharge-user/recharge-user.component';
import { GameBillComponent } from './game-bill/game-bill.component';


const routes: Routes = [
    { path: 'action', component: OperationActionComponent },
    { path: 'serverlog', component: ServerlogComponent },
    { path: 'picturemanage', component: PictureManageComponent },
    { path: 'devicemanage', component: DeviceManageComponent },
    { path: 'serverupdate', component: ServerUpdateComponent },
    { path: 'exceptionLog', component: ExceptionLogComponent },
    { path: 'rechargeuser', component: RechargeUserComponent },
    { path: 'gamebill', component: GameBillComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OperationRoutingModule { }
