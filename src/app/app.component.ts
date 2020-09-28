import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('sidenav', { static: false }) public sidenav: MatSidenav;
  public isToolbar: boolean = true;
  public navMode: 'over' | 'push' | 'side' = 'over';
  public navOpened: boolean = false;

  constructor(
    private router: Router,
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit() {
    this.initMenu();
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe( ( event: NavigationEnd ) => {
        //Enlève la toolbar caché sous la toolbar affichée dans le cas da la page login
        //pour éviter d'avoir un ascenseur
        ( event.url && event.url.search('/public/login/login') > -1 ) ? this.isToolbar = false : this.isToolbar = true;
      });
  }

  initMenu() {
    if ( this.deviceService.isMobile() || this.deviceService.isTablet() ) {
      this.navMode = 'over';
      this.navOpened = false;
    }
    if ( this.deviceService.isDesktop() ) {
      this.navMode = "side";
      this.navOpened = true;
    }
  }

  onShowMenu() {
    this.sidenav.toggle();
  }

  onHideMenu() {
    if ( this.deviceService.isMobile() || this.deviceService.isTablet() ) this.sidenav.close();
  }

}
