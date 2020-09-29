import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from 'src/app/error/error-components/error/error.component';
import { DataCarComponent } from './data-car/data-car.component';


const routes: Routes = [
  { path: '', children: [
    { path: 'data-car', component: DataCarComponent },
    { path: '', redirectTo: 'data-car', pathMatch: 'full' },
    { path: '**', component: ErrorComponent, data: { error: 404 } }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataCarRoutingModule { }
