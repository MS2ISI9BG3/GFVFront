import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManageRideComponent} from './manage-ride/manage-ride.component';
import {OneRideComponent} from './one-ride/one-ride.component';


const routes: Routes = [
  {path: 'manage-ride', component: ManageRideComponent},
  {path: 'one-ride', component: OneRideComponent},
  { path: '', redirectTo: 'manage-ride', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRideRoutingModule { }
