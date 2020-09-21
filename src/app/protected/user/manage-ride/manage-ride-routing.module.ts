import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManageRideComponent} from './manage-ride/manage-ride.component';
import {AddRideComponent} from './add-ride/add-ride.component';
import {OneRideComponent} from './one-ride/one-ride.component';


const routes: Routes = [
  {path: 'manage-ride', component: ManageRideComponent},
  {path: 'add-ride', component: AddRideComponent},
  {path: 'one-ride', component: OneRideComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRideRoutingModule { }
