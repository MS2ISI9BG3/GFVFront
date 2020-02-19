import { NgModule } from '@angular/core';
import { ShowRideRoutingModule } from './show-ride-routing.module';
import { ShowRideComponent } from './show-ride/show-ride.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/dependencies/material-module';

@NgModule({
  declarations: [ShowRideComponent],
  imports: [
    SharedModule,
    ShowRideRoutingModule
  ]
})
export class ShowRideModule { }
