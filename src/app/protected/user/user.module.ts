import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { SearchRideModule } from './search-ride/search-ride.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManageRideModule } from './manage-ride/manage-ride.module';
import { BookingRideModule } from './booking-ride/booking-ride.module';
import { ManageProfilModule } from './manage-profil/manage-profil.module';
import { ChatModule } from './chat/chat.module';
import { ReportModule } from './report/report.module';
import { ShowRideModule } from './show-ride/show-ride.module';
import { ErrorModule } from 'src/app/error/error.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    UserRoutingModule,
    SearchRideModule,
    ManageRideModule,
    BookingRideModule,
    ManageProfilModule,
    ChatModule,
    ReportModule,
    ShowRideModule,
    ErrorModule
  ]
})
export class UserModule { }
