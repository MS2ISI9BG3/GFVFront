import { NgModule } from '@angular/core';
import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report/report.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ErrorModule } from 'src/app/error/error.module';


@NgModule({
  declarations: [ReportComponent],
  imports: [
    SharedModule,
    ReportRoutingModule,
    ErrorModule
  ]
})
export class ReportModule { }
