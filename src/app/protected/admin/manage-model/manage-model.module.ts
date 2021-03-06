import { NgModule } from '@angular/core';
import { ManageModelRoutingModule } from './manage-model-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManageModelComponent } from './manage-model/manage-model.component';
import { ListModelComponent } from './list-model/list-model.component';
import { OneModelComponent } from './one-model/one-model.component';
import { ErrorModule } from 'src/app/error/error.module';

@NgModule({
  declarations: [
    ManageModelComponent,
    ListModelComponent,
    OneModelComponent
  ],
  imports: [
    SharedModule,
    ManageModelRoutingModule,
    ErrorModule
  ]
})
export class ManageModelModule { }
