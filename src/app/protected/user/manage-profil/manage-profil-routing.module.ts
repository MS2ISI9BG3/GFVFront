import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageProfilComponent } from './manage-profil/manage-profil.component';


const routes: Routes = [
  { path: 'manage-profil', component: ManageProfilComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageProfilRoutingModule { }
