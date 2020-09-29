import { NgModule } from '@angular/core';
import { CommonRoutingModule } from './common-routing.module';
import { DataCarModule } from './data-car/data-car.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ErrorModule } from 'src/app/error/error.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CommonRoutingModule,
    DataCarModule,
    ErrorModule
  ]
})
export class CommonModule { }
