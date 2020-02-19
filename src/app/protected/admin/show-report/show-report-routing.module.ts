import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowReportComponent } from './show-report/show-report.component';


const routes: Routes = [
  { path: 'show-report', component: ShowReportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowReportRoutingModule { }
