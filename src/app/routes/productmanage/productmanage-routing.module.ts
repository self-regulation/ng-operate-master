import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CloudProductComponent } from './cloud-product/cloud-product.component';
import { OrderManageComponent } from './order-manage/order-manage.component';


const routes: Routes = [
    { path: 'cloudproduct', component: CloudProductComponent },
    { path: 'ordermanage', component: OrderManageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductManageRoutingModule { }
