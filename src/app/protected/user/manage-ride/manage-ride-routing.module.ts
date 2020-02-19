import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageRideComponent } from './manage-ride/manage-ride.component';


const routes: Routes = [
  { path: 'manage-ride', component: ManageRideComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRideRoutingModule { }
