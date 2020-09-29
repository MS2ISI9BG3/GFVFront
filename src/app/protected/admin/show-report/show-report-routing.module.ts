import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from 'src/app/error/error-components/error/error.component';
import { ShowReportComponent } from './show-report/show-report.component';


const routes: Routes = [
  { path: '', children: [
    { path: 'show-report', component: ShowReportComponent },
    { path: '', redirectTo: 'show-report', pathMatch: 'full' },
    { path: '**', component: ErrorComponent, data: { error: 404 } }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowReportRoutingModule { }
