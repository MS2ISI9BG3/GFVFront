import { NgModule } from '@angular/core';
import { BookingRideRoutingModule } from './booking-ride-routing.module';
import { BookingRideComponent } from './booking-ride/booking-ride.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [BookingRideComponent],
  imports: [
    SharedModule,
    BookingRideRoutingModule
  ]
})
export class BookingRideModule { }
