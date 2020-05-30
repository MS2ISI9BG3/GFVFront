import { NgModule } from '@angular/core';
import { ManageCarRoutingModule } from './manage-car-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManageCarComponent } from './manage-car/manage-car.component';
import { ListCarComponent } from './list-car/list-car.component';
import { AddCarComponent } from './add-car/add-car.component';
import { OneCarComponent } from './one-car/one-car.component';


@NgModule({
  declarations: [
    ManageCarComponent,
    ListCarComponent,
    AddCarComponent,
    OneCarComponent
  ],
  imports: [
    SharedModule,
    ManageCarRoutingModule
  ]
})
export class ManageCarModule { }
