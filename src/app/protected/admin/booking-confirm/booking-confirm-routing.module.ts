import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from 'src/app/error/error-components/error/error.component';
import { BookingConfirmComponent } from './booking-confirm/booking-confirm.component';


const routes: Routes = [
  { path: '', children: [
    { path: 'booking-confirm', component: BookingConfirmComponent },
    { path: '', redirectTo: 'booking-confirm', pathMatch: 'full' },
    { path: '**', component: ErrorComponent, data: { error: 404 } }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingConfirmRoutingModule { }
