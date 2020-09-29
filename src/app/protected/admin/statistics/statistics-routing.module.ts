import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from 'src/app/error/error-components/error/error.component';
import { StatisticsComponent } from './statistics/statistics.component';


const routes: Routes = [
  { path: '', children: [
    { path: 'statistics', component: StatisticsComponent },
    { path: '', redirectTo: 'statistics', pathMatch: 'full' },
    { path: '**', component: ErrorComponent, data: { error: 404 } }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
