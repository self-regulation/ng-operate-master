import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { CfgTemplateComponent } from './cfg-template/cfg-template.component';
import { SetGameRoutingModule } from './manageconfig-routing.module';
import { UserActionComponent } from './user-action/user-action.component';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';


const THIRDMODULES = [NzBreadCrumbModule, NzDatePickerModule];

const COMPONENTS = [CfgTemplateComponent, UserActionComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [SharedModule, SetGameRoutingModule, ...THIRDMODULES],
    exports: [...THIRDMODULES],
    providers: [],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    entryComponents: COMPONENTS_NOROUNT,
})
export class SetGameModule { }
