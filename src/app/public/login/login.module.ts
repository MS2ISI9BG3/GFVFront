import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ActivateComponent } from './activate/activate.component';
import { ErrorModule } from 'src/app/error/error.module';

@NgModule({
  declarations: [
    LoginComponent,
    ActivateComponent
  ],
  imports: [
    SharedModule,
    LoginRoutingModule,
    ErrorModule
  ]
})
export class LoginModule { }
