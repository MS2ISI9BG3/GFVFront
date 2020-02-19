import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../shared/guards/auth-guard.service';


const routes: Routes = [
  { path: 'protected/user', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate: [AuthGuardService] },
  { path: 'protected/admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuardService] },
  { path: 'protected/common', loadChildren: () => import('./common/common.module').then(m => m.CommonModule) },
  //{ path: '', redirectTo: 'user', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
