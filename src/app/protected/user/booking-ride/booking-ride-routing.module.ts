import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingRideComponent } from './booking-ride/booking-ride.component';


const routes: Routes = [
  { path: 'booking-ride', component: BookingRideComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRideRoutingModule { }
