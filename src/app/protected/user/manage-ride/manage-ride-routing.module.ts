import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ErrorComponent } from 'src/app/error/error-components/error/error.component';
import {ManageRideComponent} from './manage-ride/manage-ride.component';
import {OneRideComponent} from './one-ride/one-ride.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'manage-ride', component: ManageRideComponent },
    { path: 'one-ride', component: OneRideComponent },
    { path: '', redirectTo: 'manage-ride', pathMatch: 'full' },
    { path: '**', component: ErrorComponent, data: { error: 404 } }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRideRoutingModule { }
