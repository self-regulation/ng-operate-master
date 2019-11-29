import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleManageComponent } from './rolemanage/rolemanage.component';
import { PeopleManageComponent } from './peoplemanage/peoplemanage.component';
import { OperatelogComponent } from './operatelog/operate-log.component';
import { MenumanageComponent } from './memumanage/menumanage.component';


const routes: Routes = [
    { path: 'peoplemamage', component: PeopleManageComponent },
    { path: 'rolemamage', component: RoleManageComponent },
    { path: 'operatelog', component: OperatelogComponent },
    { path: 'menumanage', component: MenumanageComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SystemRoutingModule { }
