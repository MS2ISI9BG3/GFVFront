import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from 'src/app/error/error-components/error/error.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';


const routes: Routes = [
  { path: '', children: [
    { path: 'booking-history', component: BookingHistoryComponent },
    { path: '', redirectTo: 'booking-history', pathMatch: 'full' },
    { path: '**', component: ErrorComponent, data: { error: 404 } }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingHistoryRoutingModule { }
