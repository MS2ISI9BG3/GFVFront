import { NgModule } from '@angular/core';
import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report/report.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ReportComponent],
  imports: [
    SharedModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
