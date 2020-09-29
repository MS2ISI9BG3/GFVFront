import { NgModule } from '@angular/core';
import { BookingRideRoutingModule } from './booking-ride-routing.module';
import { BookingRideComponent } from './booking-ride/booking-ride.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ErrorModule } from 'src/app/error/error.module';


@NgModule({
  declarations: [BookingRideComponent],
  imports: [
    SharedModule,
    BookingRideRoutingModule,
    ErrorModule
  ]
})
export class BookingRideModule { }
