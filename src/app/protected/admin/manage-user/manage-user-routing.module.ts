import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { OneUserComponent } from './one-user/one-user.component';

const routes: Routes = [
  { path: 'manage-user', component: ManageUserComponent },
  { path: 'one-user', component: OneUserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUserRoutingModule { }
