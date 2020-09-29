import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageModelComponent } from './manage-model/manage-model.component';
import { OneModelComponent } from './one-model/one-model.component';

const routes: Routes = [
  { path: 'manage-model', component: ManageModelComponent },
  { path: 'one-model', component: OneModelComponent },
  { path: '', redirectTo: 'manage-model', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageModelRoutingModule { }
