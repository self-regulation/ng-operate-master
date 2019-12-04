import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WhiteListComponent } from './whitelist/white-list.component';
import { RechargeUserComponent } from './recharge-user/recharge-user.component';
import { GameBillComponent } from './game-bill/game-bill.component';
import { PlayerQuestionComponent } from './player-question/player-question.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';


const routes: Routes = [
    { path: 'whitelist', component: WhiteListComponent },
    { path: 'rechargeuser', component: RechargeUserComponent },
    { path: 'gamebill', component: GameBillComponent },
    { path: 'playerquestion', component: PlayerQuestionComponent },
    { path: 'questiondetail', component: QuestionDetailComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlayerManageRoutingModule { }
