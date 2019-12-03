import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// delon
// import { AlainThemeModule } from '@delon/theme';
// import { DelonChartModule } from '@delon/chart';
import { DelonABCModule } from '@delon/abc';
// import { DelonACLModule } from '@delon/acl';
// import { DelonFormModule } from '@delon/form';

// #region third libs
// import { NgZorroAntdModule } from 'ng-zorro-antd';
// import { CountdownModule } from 'ngx-countdown';
//NgZorro组件库
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzNotificationModule } from 'ng-zorro-antd/notification';



import { NgxEchartsModule } from 'ngx-echarts';

import { DynamicFormQuestionComponent } from '@core/components/dynamic-forms/dynamic-form-question.component';
import { OperationStatus } from './pipes/operation-status.pipe';
import { TimeTransform } from './pipes/moment.pipe';
import { RmbConversion } from './pipes/rmb-money.pipe';
import { CommandWindowModal } from '@core/components/command-window/command-window.component';
import { NotificationComponent } from '@core/notification/notification.component';
// import { DelonACLModule } from '@delon/acl';  //权限模块
const THIRDMODULES = [
  // NgZorroAntdModule,
  // CountdownModule
  NzCollapseModule,
  NzFormModule,
  NzToolTipModule,
  NzSelectModule,
  NzRadioModule,
  NzCardModule,
  NzModalModule,
  NzIconModule,
  NzDrawerModule,
  NzDividerModule,
  NzTabsModule,
  NzDropDownModule,
  NzAvatarModule,
  NzGridModule,
  NzTableModule,
  NzSpinModule,
  NzInputModule,
  NzMessageModule,
  NzButtonModule,
  NzPopconfirmModule,
  NzEmptyModule,
  NzNotificationModule
];
// #endregion

// #region your componets & directives
const COMPONENTS = [DynamicFormQuestionComponent, CommandWindowModal, NotificationComponent];
const DIRECTIVES = [];
// #endregion

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    // AlainThemeModule.forChild(),
    DelonABCModule,
    // DelonACLModule,
    // DelonFormModule,
    // DelonChartModule,
    // third libs
    NgxEchartsModule,
    ...THIRDMODULES
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    OperationStatus,
    TimeTransform,
    RmbConversion
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // AlainThemeModule,
    DelonABCModule,
    // DelonACLModule,
    // DelonFormModule,
    // DelonChartModule,
    // third libs
    NgxEchartsModule,
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    OperationStatus,
    TimeTransform,
    RmbConversion
  ]
})
export class SharedModule { }
