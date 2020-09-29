import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagePlaceComponent } from './manage-place/manage-place.component';
import { OnePlaceComponent } from './one-place/one-place.component';


const routes: Routes = [
  { path: 'manage-place', component: ManagePlaceComponent },
  { path: 'one-place', component: OnePlaceComponent },
  { path: '', redirectTo: 'manage-place', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagePlaceRoutingModule { }
