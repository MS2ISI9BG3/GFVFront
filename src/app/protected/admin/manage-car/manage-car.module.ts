import { NgModule } from '@angular/core';
import { ManageCarRoutingModule } from './manage-car-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManageCarComponent } from './manage-car/manage-car.component';
import { ListCarComponent } from './list-car/list-car.component';
import { AddCarComponent } from './add-car/add-car.component';
import { OneCarComponent } from './one-car/one-car.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { ErrorModule } from 'src/app/error/error.module';


@NgModule({
  declarations: [
    ManageCarComponent,
    ListCarComponent,
    AddCarComponent,
    OneCarComponent
  ],
  imports: [
    SharedModule,
    ManageCarRoutingModule,
    MatChipsModule,
    MatSelectModule,
    MatDatepickerModule,
    ErrorModule
  ]
})
export class ManageCarModule { }
