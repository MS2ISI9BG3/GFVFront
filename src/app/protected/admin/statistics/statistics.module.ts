import { NgModule } from '@angular/core';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics/statistics.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ErrorModule } from 'src/app/error/error.module';


@NgModule({
  declarations: [
    StatisticsComponent
  ],
  imports: [
    SharedModule,
    StatisticsRoutingModule,
    ErrorModule
  ]
})
export class StatisticsModule { }
