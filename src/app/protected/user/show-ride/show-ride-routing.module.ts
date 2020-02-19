import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowRideComponent } from './show-ride/show-ride.component';


const routes: Routes = [
  { path: 'show-ride', component: ShowRideComponent },
  { path: '', redirectTo: 'show-ride', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowRideRoutingModule { }
