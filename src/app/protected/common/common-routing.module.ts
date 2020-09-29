import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from 'src/app/error/error-components/error/error.component';
import { DataCarComponent } from './data-car/data-car/data-car.component';


const routes: Routes = [
  { path: '', children: [
    { path: 'data-car', loadChildren: () => import('./data-car/data-car.module').then(m => m.DataCarModule) },
    { path: 'test', loadChildren: () => import('./test/test.module').then(m => m.TestModule) },
    { path: '', redirectTo: 'data-car', pathMatch: 'full' },
    { path: '**', component: ErrorComponent, data: { error: 404 } }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonRoutingModule { }
