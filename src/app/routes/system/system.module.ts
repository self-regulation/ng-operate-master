import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { RoleManageComponent } from './rolemanage/rolemanage.component';
import { SystemRoutingModule } from './system-routing.module';
import { PeopleManageComponent } from './peoplemanage/peoplemanage.component';
import { OperatelogComponent } from './operatelog/operate-log.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { MenumanageComponent } from './memumanage/menumanage.component';
import { MenuAuthorizationComponent } from './menuauthorization/menu-authorization.component';


const THIRDMODULES = [NzBreadCrumbModule, NzDatePickerModule, NzCheckboxModule];

const COMPONENTS = [PeopleManageComponent, RoleManageComponent, OperatelogComponent, MenumanageComponent, MenuAuthorizationComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [SharedModule, SystemRoutingModule, ...THIRDMODULES],
    exports: [...THIRDMODULES],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    entryComponents: COMPONENTS_NOROUNT,
})
export class SystemModule { }
