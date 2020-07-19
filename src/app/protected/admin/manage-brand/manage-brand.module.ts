import { NgModule } from '@angular/core';
import { ManageBrandRoutingModule } from './manage-brand-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManageBrandComponent } from './manage-brand/manage-brand.component';
import { ListBrandComponent } from './list-brand/list-brand.component';
import { OneBrandComponent } from './one-brand/one-brand.component';

@NgModule({
  declarations: [
    ManageBrandComponent,
    ListBrandComponent,
    OneBrandComponent
  ],
  imports: [
    SharedModule,
    ManageBrandRoutingModule
  ]
})
export class ManageBrandModule { }
