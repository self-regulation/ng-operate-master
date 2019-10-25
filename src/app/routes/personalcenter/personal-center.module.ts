import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { PersonalCenterComponent } from './personal-center/personal-center.component';
import { PersonalCenterRoutingModule } from './personal-center-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzUploadModule } from 'ng-zorro-antd/upload';

const THIRDMODULES = [NzBreadCrumbModule, NzUploadModule];
const COMPONENTS = [PersonalCenterComponent, ResetPasswordComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [SharedModule, PersonalCenterRoutingModule, ...THIRDMODULES],
    exports: [...THIRDMODULES],
    providers: [],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    entryComponents: COMPONENTS_NOROUNT,
})
export class PersonalCenterModule { }
