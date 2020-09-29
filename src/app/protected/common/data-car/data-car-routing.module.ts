import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataCarComponent } from './data-car/data-car.component';


const routes: Routes = [
  { path: 'data-car', component: DataCarComponent },
  { path: '', redirectTo: 'data-car', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataCarRoutingModule { }
