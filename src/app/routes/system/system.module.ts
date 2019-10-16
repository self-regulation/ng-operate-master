import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { RoleManageComponent } from './rolemanage/rolemanage.component';
import { SystemRoutingModule } from './system-routing.module';
import { PeopleManageComponent } from './peoplemanage/peoplemanage.component';
import { OperatelogComponent } from './operatelog/operate-log.component';


const COMPONENTS = [PeopleManageComponent, RoleManageComponent, OperatelogComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [SharedModule, SystemRoutingModule],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    entryComponents: COMPONENTS_NOROUNT,
})
export class SystemModule { }
