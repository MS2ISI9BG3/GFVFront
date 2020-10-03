import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreationComponent } from './creation/creation.component';
import { ErrorComponent } from 'src/app/error/error-components/error/error.component';

const routes: Routes = [
  { path: '', children: [
      { path: 'login', component: LoginComponent },
      { path: 'creation', component: CreationComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', component: ErrorComponent, data: { error: 404 } }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
