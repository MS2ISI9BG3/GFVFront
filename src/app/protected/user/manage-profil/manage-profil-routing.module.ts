import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from 'src/app/error/error-components/error/error.component';
import { ManageProfilComponent } from './manage-profil/manage-profil.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'manage-profil', component: ManageProfilComponent },
    { path: '', redirectTo: 'manage-profil', pathMatch: 'full' },
    { path: '**', component: ErrorComponent, data: { error: 404 } }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageProfilRoutingModule { }
