import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// delon
import { AlainThemeModule } from '@delon/theme';
// import { DelonChartModule } from '@delon/chart';
import { DelonABCModule } from '@delon/abc';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';

// #region third libs
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CountdownModule } from 'ngx-countdown';

import { NgxEchartsModule } from 'ngx-echarts';

import { DynamicFormQuestionComponent } from '@core/components/dynamic-forms/dynamic-form-question.component';
import { OperationStatus } from './pipes/operation-status.pipe';
import { TimeTransform } from './pipes/moment.pipe';
const THIRDMODULES = [
  NgZorroAntdModule,
  CountdownModule
];
// #endregion

// #region your componets & directives
const COMPONENTS = [DynamicFormQuestionComponent];
const DIRECTIVES = [];
// #endregion

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AlainThemeModule.forChild(),
    DelonABCModule,
    DelonACLModule,
    DelonFormModule,
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
    TimeTransform
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonABCModule,
    DelonACLModule,
    DelonFormModule,
    // DelonChartModule,
    // third libs
    NgxEchartsModule,
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    OperationStatus,
    TimeTransform
  ]
})
export class SharedModule { }
