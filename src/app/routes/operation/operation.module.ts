import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { OperationRoutingModule } from './operation-routing.module';
import { OperationActionComponent } from './operation-action/operation-action.component';
import { ServerlogComponent } from './server-log/server-log.component';



const COMPONENTS = [OperationActionComponent, ServerlogComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [SharedModule, OperationRoutingModule],
    providers: [],
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    entryComponents: COMPONENTS_NOROUNT,
})
export class OperationModule { }

