import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from 'src/app/error/error-components/error/error.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { OneUserComponent } from './one-user/one-user.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'manage-user', component: ManageUserComponent },
    { path: 'one-user', component: OneUserComponent },
    { path: '', redirectTo: 'manage-user', pathMatch: 'full' },
    { path: '**', component: ErrorComponent, data: { error: 404 } }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUserRoutingModule { }
