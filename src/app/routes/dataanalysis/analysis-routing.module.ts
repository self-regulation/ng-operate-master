import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRetainComponent } from './userretain/user-retain.component';
import { UserListComponent } from './userList/user-list.component';
import { UserDetailComponent } from './userDetail/user-detail.component';
import { ACLGuard } from '@delon/acl';

const routes: Routes = [
    { path: 'userRetain', component: UserRetainComponent },
    { path: 'userList', component: UserListComponent },
    { path: 'userDetail', component: UserDetailComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AnalysisModuleRoot { }
