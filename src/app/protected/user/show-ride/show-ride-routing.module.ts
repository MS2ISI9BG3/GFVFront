import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from 'src/app/error/error-components/error/error.component';
import { ShowRideComponent } from './show-ride/show-ride.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'show-ride', component: ShowRideComponent },
    { path: '', redirectTo: 'show-ride', pathMatch: 'full' },
    { path: '**', component: ErrorComponent, data: { error: 404 } }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowRideRoutingModule { }
