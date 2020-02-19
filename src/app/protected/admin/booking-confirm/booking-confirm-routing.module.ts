import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingConfirmComponent } from './booking-confirm/booking-confirm.component';


const routes: Routes = [
  { path: 'booking-confirm', component: BookingConfirmComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingConfirmRoutingModule { }
