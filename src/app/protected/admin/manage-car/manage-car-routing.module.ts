import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageCarComponent } from './manage-car/manage-car.component';


const routes: Routes = [
  { path: 'manage-car', component: ManageCarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageCarRoutingModule { }
