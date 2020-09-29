import { NgModule } from '@angular/core';
import { ShowReportRoutingModule } from './show-report-routing.module';
import { ShowReportComponent } from './show-report/show-report.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ErrorModule } from 'src/app/error/error.module';


@NgModule({
  declarations: [
    ShowReportComponent
  ],
  imports: [
    SharedModule,
    ShowReportRoutingModule,
    ErrorModule
  ]
})
export class ShowReportModule { }
