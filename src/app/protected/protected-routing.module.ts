import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../core/services/guards/auth-guard.service';
import { ErrorComponent } from '../error/error-components/error/error.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate: [AuthGuardService] },
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuardService] },
    { path: 'common', loadChildren: () => import('./common/common.module').then(m => m.CommonModule) },
    { path: '', redirectTo: 'user', pathMatch: 'full' },
    { path: '**', component: ErrorComponent, data: { error: 404 } }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
