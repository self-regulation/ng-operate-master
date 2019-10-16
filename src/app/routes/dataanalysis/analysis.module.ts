import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AnalysisModuleRoot } from './analysis-routing.module';
import { UserRetainComponent } from './userretain/user-retain.component';
import { UserListComponent } from './userList/user-list.component';
import { UserDetailComponent } from './userDetail/user-detail.component';

const COMPONENTS = [UserRetainComponent, UserListComponent, UserDetailComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [SharedModule, AnalysisModuleRoot],
    providers: [],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    entryComponents: COMPONENTS_NOROUNT,
})
export class AnalysisModule { }
