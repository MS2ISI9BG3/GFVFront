import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageBrandComponent } from './manage-brand/manage-brand.component';
import { OneBrandComponent } from './one-brand/one-brand.component';

const routes: Routes = [
  { path: 'manage-brand', component: ManageBrandComponent },
  { path: 'one-brand', component: OneBrandComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageBrandRoutingModule { }
