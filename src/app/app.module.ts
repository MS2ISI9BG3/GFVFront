import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MenuHeaderComponent } from './core/menu-components/menu-header/menu-header.component';
import { MenuContentComponent } from './core/menu-components/menu-content/menu-content.component';
import { ErrorComponent } from './error/error-components/error/error.component';
import { ErrorModule } from './error/error.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuHeaderComponent,
    MenuContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    SharedModule,
    ErrorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
