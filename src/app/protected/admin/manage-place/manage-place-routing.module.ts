import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from 'src/app/error/error-components/error/error.component';
import { ManagePlaceComponent } from './manage-place/manage-place.component';
import { OnePlaceComponent } from './one-place/one-place.component';


const routes: Routes = [
  { path: '', children: [
    { path: 'manage-place', component: ManagePlaceComponent },
    { path: 'one-place', component: OnePlaceComponent },
    { path: '', redirectTo: 'manage-place', pathMatch: 'full' },
    { path: '**', component: ErrorComponent, data: { error: 404 } }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagePlaceRoutingModule { }
