import { NgModule } from '@angular/core';
import { CommonRoutingModule } from './common-routing.module';
import { DataCarModule } from './data-car/data-car.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CommonRoutingModule,
    DataCarModule
  ]
})
export class CommonModule { }
