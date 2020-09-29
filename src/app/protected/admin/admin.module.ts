import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { ManagePlaceModule } from './manage-place/manage-place.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManageCarModule } from './manage-car/manage-car.module';
import { ManageUserModule } from './manage-user/manage-user.module';
import { BookingHistoryModule } from './booking-history/booking-history.module';
import { BookingConfirmModule } from './booking-confirm/booking-confirm.module';
import { ShowReportModule } from './show-report/show-report.module';
import { StatisticsModule } from './statistics/statistics.module';
import { ErrorModule } from 'src/app/error/error.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    AdminRoutingModule,
    ManagePlaceModule,
    ManageCarModule,
    ManageUserModule,
    BookingHistoryModule,
    BookingConfirmModule,
    ShowReportModule,
    StatisticsModule,
    ErrorModule
  ]
})
export class AdminModule { }
