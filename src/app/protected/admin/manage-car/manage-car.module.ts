import { NgModule } from '@angular/core';
import { ManageCarRoutingModule } from './manage-car-routing.module';
import { ManageCarComponent } from './manage-car/manage-car.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ManageCarComponent
  ],
  imports: [
    SharedModule,
    ManageCarRoutingModule
  ]
})
export class ManageCarModule { }
