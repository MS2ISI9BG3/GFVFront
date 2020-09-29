import { NgModule } from '@angular/core';
import { ManagePlaceRoutingModule } from './manage-place-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManagePlaceComponent } from './manage-place/manage-place.component';
import { ListPlaceComponent } from './list-place/list-place.component';
import { OnePlaceComponent } from './one-place/one-place.component';
import { ErrorModule } from 'src/app/error/error.module';


@NgModule({
  declarations: [
    ManagePlaceComponent,
    ListPlaceComponent,
    OnePlaceComponent
  ],
  imports: [
    SharedModule,
    ManagePlaceRoutingModule,
    ErrorModule
  ]
})
export class ManagePlaceModule { }
