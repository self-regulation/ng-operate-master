import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';


import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzBadgeModule } from 'ng-zorro-antd';
import { GameManageRoutingModule } from './gamemanage-routing.module';
import { PictureManageComponent } from './picture-manage/picture-manage.component';


const THIRDMODULES = [NzBreadCrumbModule, NzDatePickerModule, NzBadgeModule];

const COMPONENTS = [PictureManageComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [SharedModule, GameManageRoutingModule, ...THIRDMODULES],
    exports: [...THIRDMODULES],
    providers: [],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    entryComponents: COMPONENTS_NOROUNT,
})
export class GameManageModule { }
