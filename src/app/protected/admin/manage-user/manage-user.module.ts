import { NgModule } from '@angular/core';
import { ManageUserRoutingModule } from './manage-user-routing.module';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ManageUserComponent],
  imports: [
    SharedModule,
    ManageUserRoutingModule
  ]
})
export class ManageUserModule { }
