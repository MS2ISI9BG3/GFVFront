import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from 'src/app/error/error-components/error/error.component';
import { SearchRideComponent } from './search-ride/search-ride.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'search-ride', component: SearchRideComponent },
    { path: '', redirectTo: 'search-ride', pathMatch: 'full' },
    { path: '**', component: ErrorComponent, data: { error: 404 } }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRideRoutingModule { }
