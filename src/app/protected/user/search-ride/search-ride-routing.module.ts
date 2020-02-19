import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchRideComponent } from './search-ride/search-ride.component';


const routes: Routes = [
  { path: 'search-ride', component: SearchRideComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRideRoutingModule { }
