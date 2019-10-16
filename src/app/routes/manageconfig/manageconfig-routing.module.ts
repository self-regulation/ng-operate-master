import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CfgTemplateComponent } from './cfg-template/cfg-template.component';
import { UserActionComponent } from './user-action/user-action.component';


const routes: Routes = [
    { path: 'cfgtemplate', component: CfgTemplateComponent },
    { path: 'useraction', component: UserActionComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SetGameRoutingModule { }
