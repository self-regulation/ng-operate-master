import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExceptionLogComponent } from './exception-log/exception-log.component';
import { ServerlogComponent } from './server-log/server-log.component';


const routes: Routes = [
    { path: 'exceptionLog', component: ExceptionLogComponent },
    { path: 'serverlog', component: ServerlogComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlatformLogRoutingModule { }
