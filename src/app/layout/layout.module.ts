import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { LayoutDefaultComponent } from './default/default.component';
import { HeaderComponent } from './default/header/header.component';
import { SidebarComponent } from './default/sidebar/sidebar.component';
import { HeaderUserComponent } from './default/header/components/user.component';


const SETTINGDRAWER = [];

const COMPONENTS = [
  LayoutDefaultComponent,
  HeaderComponent,
  SidebarComponent,
  ...SETTINGDRAWER
];

const HEADERCOMPONENTS = [
  HeaderUserComponent
];

// passport
import { LayoutPassportComponent } from './passport/passport.component';
const PASSPORT = [
  LayoutPassportComponent
];

@NgModule({
  imports: [SharedModule],
  entryComponents: SETTINGDRAWER,
  declarations: [
    ...COMPONENTS,
    ...HEADERCOMPONENTS,
    ...PASSPORT
  ],
  exports: [
    ...COMPONENTS,
    ...PASSPORT
  ]
})
export class LayoutModule { }
