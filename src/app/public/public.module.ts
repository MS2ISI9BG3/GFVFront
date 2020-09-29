import { NgModule } from '@angular/core';
import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ErrorModule } from '../error/error.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    PublicRoutingModule,
    ErrorModule
  ]
})
export class PublicModule { }
