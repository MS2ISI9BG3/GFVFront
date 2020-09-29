import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from 'src/app/error/error-components/error/error.component';
import { BookingRideComponent } from './booking-ride/booking-ride.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'booking-ride', component: BookingRideComponent },
    { path: '', redirectTo: 'booking-ride', pathMatch: 'full' },
    { path: '**', component: ErrorComponent, data: { error: 404 } }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRideRoutingModule { }
