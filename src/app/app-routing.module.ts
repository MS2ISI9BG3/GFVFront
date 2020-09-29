import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'public', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) },
  { path: 'protected', loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule) },
  { path: '', redirectTo: 'protected', pathMatch: 'full' },
  { path: '**', redirectTo: 'protected' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
