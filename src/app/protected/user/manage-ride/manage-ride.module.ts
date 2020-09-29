import {NgModule} from '@angular/core';
import {ManageRideRoutingModule} from './manage-ride-routing.module';
import {ManageRideComponent} from './manage-ride/manage-ride.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {ListRideComponent} from "./list-ride/list-ride.component";
import {OneRideComponent} from "./one-ride/one-ride.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatExpansionModule} from "@angular/material/expansion";
import { ErrorModule } from 'src/app/error/error.module';


@NgModule({
  declarations: [
    ManageRideComponent,
    ListRideComponent,
    OneRideComponent
  ],
  imports: [
    SharedModule,
    ManageRideRoutingModule,
    MatDatepickerModule,
    MatExpansionModule,
    ErrorModule
  ]
})
export class ManageRideModule { }
