import { NgModule } from '@angular/core';
import { ManageRideRoutingModule } from './manage-ride-routing.module';
import { ManageRideComponent } from './manage-ride/manage-ride.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ManageRideComponent],
  imports: [
    SharedModule,
    ManageRideRoutingModule
  ]
})
export class ManageRideModule { }
