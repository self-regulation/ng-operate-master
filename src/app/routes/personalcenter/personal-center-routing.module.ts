import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalCenterComponent } from './personal-center/personal-center.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


const routes: Routes = [
    { path: '', component: PersonalCenterComponent },
    { path: 'personal', component: PersonalCenterComponent },
    { path: 'resetpassword', component: ResetPasswordComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PersonalCenterRoutingModule { }
