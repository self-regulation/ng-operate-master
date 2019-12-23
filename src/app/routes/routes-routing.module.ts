import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { ACLGuard } from '@delon/acl';
import { HomePageComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    // canActivate: [SimpleGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomePageComponent, data: { title: '首页', titleI18n: '西山居' } },
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'gamemanage', loadChildren: () => import('./gamemanage/gamemanage.module').then(m => m.GameManageModule) },//游戏管理
      { path: 'playermanage', loadChildren: () => import('./playermanage/playermanage.module').then(m => m.PlayerManageModule) },//玩家白名单管理
      { path: 'analysis', loadChildren: () => import('./dataanalysis/analysis.module').then(m => m.AnalysisModule) },//数据分析
      { path: 'roductmanage', loadChildren: () => import('./productmanage/productmanage.module').then(m => m.ProductManageModule) },
      { path: 'operation', loadChildren: () => import('./operation/operation.module').then(m => m.OperationModule) },
      { path: 'config', loadChildren: () => import('./manageconfig/manageconfig.module').then(m => m.SetGameModule) },
      { path: 'system', loadChildren: () => import('./system/system.module').then(m => m.SystemModule) },
      { path: 'platformlog', loadChildren: () => import('./platformlog/platformlog.module').then(m => m.PlatformLogModule) },
      { path: 'center', loadChildren: () => import('./personalcenter/personal-center.module').then(m => m.PersonalCenterModule) },
      { path: 'exception', loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule) },
      { path: 'monitor', loadChildren: () => import('./monitor/monitor.module').then(m => m.MonitorModule) },

    ]
  },
  // 全屏布局
  // {
  //     path: 'fullscreen',
  //     component: LayoutFullScreenComponent,
  //     children: [
  //     ]
  // },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: 'login', component: UserLoginComponent, data: { title: '登录', titleI18n: '登录' } }
      // { path: 'lock', component: UserLockComponent, data: { title: '锁屏', titleI18n: 'lock' } },
    ]
  },
  // 单页不包裹Layout
  { path: 'callback/:type', component: CallbackComponent },
  { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, {
      useHash: environment.useHash,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top',
    }
    )],
  exports: [RouterModule],
})
export class RouteRoutingModule { }
