import { NgModule } from '@angular/core';
import { BookingConfirmRoutingModule } from './booking-confirm-routing.module';
import { BookingConfirmComponent } from './booking-confirm/booking-confirm.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [BookingConfirmComponent],
  imports: [
    SharedModule,
    BookingConfirmRoutingModule
  ]
})
export class BookingConfirmModule { }
