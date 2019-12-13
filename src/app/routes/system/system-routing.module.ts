import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleManageComponent } from './rolemanage/rolemanage.component';
import { PeopleManageComponent } from './peoplemanage/peoplemanage.component';
import { OperatelogComponent } from './operatelog/operate-log.component';
import { MenumanageComponent } from './memumanage/menumanage.component';
import { MenuAuthorizationComponent } from './menuauthorization/menu-authorization.component';
import { ApiListComponent } from './apilist/api-list.component';
import { ApiAuthorizationComponent } from './api-authorization/api-authorization.component';


const routes: Routes = [
    { path: 'peoplemamage', component: PeopleManageComponent },
    { path: 'rolemamage', component: RoleManageComponent },
    { path: 'operatelog', component: OperatelogComponent },
    { path: 'menumanage', component: MenumanageComponent },
    { path: 'menuauthorization', component: MenuAuthorizationComponent },
    { path: 'apiList', component: ApiListComponent },
    { path: 'apiauthorization', component: ApiAuthorizationComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SystemRoutingModule { }
