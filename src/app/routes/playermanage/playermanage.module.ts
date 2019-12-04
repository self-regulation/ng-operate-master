import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';


import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzBadgeModule } from 'ng-zorro-antd';
import { PlayerManageRoutingModule } from './playermanage-routing.module';
import { WhiteListComponent } from './whitelist/white-list.component';
import { RechargeUserComponent } from './recharge-user/recharge-user.component';
import { GameBillComponent } from './game-bill/game-bill.component';
import { PlayerQuestionComponent } from './player-question/player-question.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';


const THIRDMODULES = [NzBreadCrumbModule, NzDatePickerModule, NzBadgeModule];

const COMPONENTS = [WhiteListComponent, RechargeUserComponent, GameBillComponent, PlayerQuestionComponent, QuestionDetailComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [SharedModule, PlayerManageRoutingModule, ...THIRDMODULES],
    exports: [...THIRDMODULES],
    providers: [],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    entryComponents: COMPONENTS_NOROUNT,
})
export class PlayerManageModule { }
