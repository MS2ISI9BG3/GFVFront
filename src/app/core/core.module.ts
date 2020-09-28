import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicModule } from '../public/public.module';
import { ProtectedModule } from '../protected/protected.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService }  from './services/fake-backend/in-memory-data.service';
import { JwtInterceptorService } from './services/helpers/jwt-interceptor.service';
import { MenuHeaderComponent } from './menu-components/menu-header/menu-header.component';
import { MenuContentComponent } from './menu-components/menu-content/menu-content.component';
import { MaterialModule } from '../shared/dependencies/material-module';
import { DeviceDetectorService } from 'ngx-device-detector';

/**
 * Rôle: démarer l'application
 * Objectif: alléger le module racine du projet
 * Importe les principaux modules de l'application
 * Importe les services communs à tous les modules de l'application
 * Importe les composants utilisés dans le template racine app.component.html
 * @export
 * @class CoreModule
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PublicModule,
    ProtectedModule,
    HttpClientModule
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    /*HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false, delay: 2000 }
    )*/
  ],
  exports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    DeviceDetectorService
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    //Empêche le core-module d'être instancié à différents endroits
    //Le core-module est instancié qu'une seul fois par projet
    if (parentModule) { 
      throw new Error('CoreModule is already loaded.'); 
    } 
  } 

}
