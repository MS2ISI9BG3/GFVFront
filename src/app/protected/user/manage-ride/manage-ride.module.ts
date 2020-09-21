import {NgModule} from '@angular/core';
import {ManageRideRoutingModule} from './manage-ride-routing.module';
import {ManageRideComponent} from './manage-ride/manage-ride.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {ListRideComponent} from "./list-ride/list-ride.component";
import {AddRideComponent} from "./add-ride/add-ride.component";
import {OneRideComponent} from "./one-ride/one-ride.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatExpansionModule} from "@angular/material/expansion";


@NgModule({
  declarations: [
    ManageRideComponent,
    ListRideComponent,
    AddRideComponent,
    OneRideComponent
  ],
  imports: [
    SharedModule,
    ManageRideRoutingModule,
    MatDatepickerModule,
    MatExpansionModule
  ]
})
export class ManageRideModule { }
