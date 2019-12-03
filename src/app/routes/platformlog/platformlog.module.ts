import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';


import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzBadgeModule } from 'ng-zorro-antd';
import { PlatformLogRoutingModule } from './platformlog-routing.module';
import { ExceptionLogComponent } from './exception-log/exception-log.component';
import { ServerlogComponent } from './server-log/server-log.component';


const THIRDMODULES = [NzBreadCrumbModule, NzDatePickerModule, NzBadgeModule];

const COMPONENTS = [ExceptionLogComponent, ServerlogComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [SharedModule, PlatformLogRoutingModule, ...THIRDMODULES],
    exports: [...THIRDMODULES],
    providers: [],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    entryComponents: COMPONENTS_NOROUNT,
})
export class PlatformLogModule { }
