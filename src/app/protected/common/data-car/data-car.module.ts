import { NgModule } from '@angular/core';
import { DataCarRoutingModule } from './data-car-routing.module';
import { DataCarComponent } from './data-car/data-car.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ErrorModule } from 'src/app/error/error.module';


@NgModule({
  declarations: [DataCarComponent],
  imports: [
    SharedModule,
    DataCarRoutingModule,
    ErrorModule
  ]
})
export class DataCarModule { }
