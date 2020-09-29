import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ManageCarComponent} from './manage-car/manage-car.component';
import {AddCarComponent} from "./add-car/add-car.component";
import {OneCarComponent} from "./one-car/one-car.component";
import { ErrorComponent } from 'src/app/error/error-components/error/error.component';


const routes: Routes = [
  { path: '', children: [
    {path: 'manage-car', component: ManageCarComponent},
    {path: 'add-car', component: AddCarComponent},
    {path: 'one-car', component: OneCarComponent},
    { path: '', redirectTo: 'manage-car', pathMatch: 'full' },
    { path: '**', component: ErrorComponent, data: { error: 404 } }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageCarRoutingModule {
}
