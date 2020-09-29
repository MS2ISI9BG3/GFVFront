import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingConfirmComponent } from './booking-confirm/booking-confirm.component';


const routes: Routes = [
  { path: 'booking-confirm', component: BookingConfirmComponent },
  { path: '', redirectTo: 'booking-confirm', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingConfirmRoutingModule { }
