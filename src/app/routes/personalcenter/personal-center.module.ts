import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { PersonalCenterComponent } from './personal-center/personal-center.component';
import { PersonalCenterRoutingModule } from './personal-center-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


const COMPONENTS = [PersonalCenterComponent, ResetPasswordComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [SharedModule, PersonalCenterRoutingModule],
    providers: [],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    entryComponents: COMPONENTS_NOROUNT,
})
export class PersonalCenterModule { }
