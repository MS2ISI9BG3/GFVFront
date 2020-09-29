import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchRideComponent } from './search-ride/search-ride.component';


const routes: Routes = [
  { path: 'search-ride', component: SearchRideComponent },
  { path: '', redirectTo: 'search-ride', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRideRoutingModule { }
