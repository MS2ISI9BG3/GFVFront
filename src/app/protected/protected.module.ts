import { NgModule } from '@angular/core';
import { ProtectedRoutingModule } from './protected-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ErrorModule } from '../error/error.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    ProtectedRoutingModule,
    ErrorModule
  ]
})
export class ProtectedModule { }
