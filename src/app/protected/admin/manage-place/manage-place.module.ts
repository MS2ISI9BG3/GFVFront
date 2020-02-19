import { NgModule } from '@angular/core';
import { ManagePlaceRoutingModule } from './manage-place-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManagePlaceComponent } from './manage-place/manage-place.component';
import { ListPlaceComponent } from './list-place/list-place.component';
import { AddPlaceComponent } from './add-place/add-place.component';
import { OnePlaceComponent } from './one-place/one-place.component';


@NgModule({
  declarations: [
    ManagePlaceComponent,
    ListPlaceComponent,
    AddPlaceComponent,
    OnePlaceComponent
  ],
  imports: [
    SharedModule,
    ManagePlaceRoutingModule
  ]
})
export class ManagePlaceModule { }
