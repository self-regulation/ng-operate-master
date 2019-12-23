import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';


import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { CloudProductComponent } from './cloud-product/cloud-product.component';
import { ProductManageRoutingModule } from './productmanage-routing.module';
import { NzBadgeModule } from 'ng-zorro-antd';
import { OrderManageComponent } from './order-manage/order-manage.component';


const THIRDMODULES = [NzBreadCrumbModule, NzDatePickerModule, NzBadgeModule];

const COMPONENTS = [CloudProductComponent, OrderManageComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [SharedModule, ProductManageRoutingModule, ...THIRDMODULES],
    exports: [...THIRDMODULES],
    providers: [],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    entryComponents: COMPONENTS_NOROUNT,
})
export class ProductManageModule { }
