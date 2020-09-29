import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'booking-ride', loadChildren: () => import('./booking-ride/booking-ride.module').then(m => m.BookingRideModule) },
  { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
  { path: 'manage-profil', loadChildren: () => import('./manage-profil/manage-profil.module').then(m => m.ManageProfilModule) },
  { path: 'manage-ride', loadChildren: () => import('./manage-ride/manage-ride.module').then(m => m.ManageRideModule) },
  { path: 'report', loadChildren: () => import('./report/report.module').then(m => m.ReportModule) },
  { path: 'search-ride', loadChildren: () => import('./search-ride/search-ride.module').then(m => m.SearchRideModule) },
  { path: 'show-ride', loadChildren: () => import('./show-ride/show-ride.module').then(m => m.ShowRideModule) },
  { path: '', redirectTo: 'manage-ride', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
