import { NgModule } from '@angular/core';
import { SearchRideRoutingModule } from './search-ride-routing.module';
import { SearchRideComponent } from './search-ride/search-ride.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [SearchRideComponent],
  imports: [
    SharedModule,
    SearchRideRoutingModule
  ]
})
export class SearchRideModule { }
