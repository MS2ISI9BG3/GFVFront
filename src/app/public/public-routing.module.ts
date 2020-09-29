import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from '../error/error-components/error/error.component';

const routes: Routes = [
  { path: '', children: [
      { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', component: ErrorComponent, data: { error: 404 } }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
