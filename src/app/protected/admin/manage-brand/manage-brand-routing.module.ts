import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from 'src/app/error/error-components/error/error.component';
import { ManageBrandComponent } from './manage-brand/manage-brand.component';
import { OneBrandComponent } from './one-brand/one-brand.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'manage-brand', component: ManageBrandComponent },
    { path: 'one-brand', component: OneBrandComponent },
    { path: '', redirectTo: 'manage-brand', pathMatch: 'full' },
    { path: '**', component: ErrorComponent, data: { error: 404 } }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageBrandRoutingModule { }
