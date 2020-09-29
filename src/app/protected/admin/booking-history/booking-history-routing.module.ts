import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingHistoryComponent } from './booking-history/booking-history.component';


const routes: Routes = [
  { path: 'booking-history', component: BookingHistoryComponent },
  { path: '', redirectTo: 'booking-history', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingHistoryRoutingModule { }
