import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test/test.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [TestComponent],
  imports: [
    SharedModule,
    TestRoutingModule
  ]
})
export class TestModule { }
