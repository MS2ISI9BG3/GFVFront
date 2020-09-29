import { NgModule } from '@angular/core';
import { ManageUserRoutingModule } from './manage-user-routing.module';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListUserComponent } from './list-user/list-user.component';
import { OneUserComponent } from './one-user/one-user.component';
import { ErrorModule } from 'src/app/error/error.module';


@NgModule({
  declarations: [
    ManageUserComponent,
    ListUserComponent,
    OneUserComponent
  ],
  imports: [
    SharedModule,
    ManageUserRoutingModule,
    ErrorModule
  ]
})
export class ManageUserModule { }
