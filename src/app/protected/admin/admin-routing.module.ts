import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagePlaceComponent } from './manage-place/manage-place/manage-place.component';


const routes: Routes = [
  { path: 'booking-confirm', loadChildren: () => import('./booking-confirm/booking-confirm.module').then(m => m.BookingConfirmModule) },
  { path: 'booking-history', loadChildren: () => import('./booking-history/booking-history.module').then(m => m.BookingHistoryModule) },
  { path: 'manage-car', loadChildren: () => import('./manage-car/manage-car.module').then(m => m.ManageCarModule) },
  { path: 'manage-brand', loadChildren: () => import('./manage-brand/manage-brand.module').then(m => m.ManageBrandModule) },
  { path: 'manage-model', loadChildren: () => import('./manage-model/manage-model.module').then(m => m.ManageModelModule) },
  { path: 'manage-place', loadChildren: () => import('./manage-place/manage-place.module').then(m => m.ManagePlaceModule) },
  { path: 'manage-user', loadChildren: () => import('./manage-user/manage-user.module').then(m => m.ManageUserModule) },
  { path: 'show-report', loadChildren: () => import('./show-report/show-report.module').then(m => m.ShowReportModule) },
  { path: 'statistics', loadChildren: () => import('./statistics/statistics.module').then(m => m.StatisticsModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
