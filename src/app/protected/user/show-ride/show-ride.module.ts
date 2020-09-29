import { NgModule } from '@angular/core';
import { ShowRideRoutingModule } from './show-ride-routing.module';
import { ShowRideComponent } from './show-ride/show-ride.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/dependencies/material-module';
import { ErrorModule } from 'src/app/error/error.module';

@NgModule({
  declarations: [ShowRideComponent],
  imports: [
    SharedModule,
    ShowRideRoutingModule,
    ErrorModule
  ]
})
export class ShowRideModule { }
