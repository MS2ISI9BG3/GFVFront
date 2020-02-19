import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataCarComponent } from './data-car/data-car/data-car.component';


const routes: Routes = [
  { path: 'data-car', loadChildren: () => import('./data-car/data-car.module').then(m => m.DataCarModule) },
  { path: 'test', loadChildren: () => import('./test/test.module').then(m => m.TestModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonRoutingModule { }
