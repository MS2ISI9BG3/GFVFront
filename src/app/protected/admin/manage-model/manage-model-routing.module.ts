import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from 'src/app/error/error-components/error/error.component';
import { ManageModelComponent } from './manage-model/manage-model.component';
import { OneModelComponent } from './one-model/one-model.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'manage-model', component: ManageModelComponent },
    { path: 'one-model', component: OneModelComponent },
    { path: '', redirectTo: 'manage-model', pathMatch: 'full' },
    { path: '**', component: ErrorComponent, data: { error: 404 } }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageModelRoutingModule { }
