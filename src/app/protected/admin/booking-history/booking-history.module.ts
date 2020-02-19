import { NgModule } from '@angular/core';
import { BookingHistoryRoutingModule } from './booking-history-routing.module';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [BookingHistoryComponent],
  imports: [
    SharedModule,
    BookingHistoryRoutingModule
  ]
})
export class BookingHistoryModule { }
