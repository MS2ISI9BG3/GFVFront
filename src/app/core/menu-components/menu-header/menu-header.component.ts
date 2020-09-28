import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild, AfterContentInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { User } from 'src/app/shared/models/entities/user';
import { Router, NavigationEnd } from '@angular/router';
import { pipe } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatToolbar } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss']
})
export class MenuHeaderComponent implements OnInit {

  @Output() showMenu = new EventEmitter();
  public user: User;
  public title: string = 'Parc véhivules';
  public isToolbar: boolean = true;
  public showIconMenu: boolean = true;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit() {
    this.initIconMenu();
    this.user = this.authenticationService.currentUserValue;
    this.initTitle();
  }

  initIconMenu() {
    if ( this.deviceService.isMobile() || this.deviceService.isTablet() ) this.showIconMenu = true;
    if ( this.deviceService.isDesktop() ) this.showIconMenu = false;
  }

  /**
   * Initialise le titre de la page en fonction de l'url courante
   * @memberof MenuHeaderComponent
   */
  initTitle() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe( ( event: NavigationEnd ) => {
        //Change le titre
        this.title = this.getTitle(event.url);
        //Enlève la toolbar caché sous la toolbar affichée dans le cas da la page login
        //pour éviter d'avoir un ascenseur
        ( event.url && event.url.search('/public/login/login') > -1 ) ? this.isToolbar = false : this.isToolbar = true;
      });
    
  }

  /**
   * Retourne le titre de la page
   * @param {string} url Url de la page
   * @returns {string}
   * @memberof MenuHeaderComponent
   */
  getTitle(url: string): string {
    if ( url ) {
      if ( url.search('booking-ride') > -1 ) return 'Emprunts';
      if ( url.search('manage-ride') > -1 ) return 'Trajets';
      if ( url.search('manage-user') > -1 ) return 'Gestion des employés';
      if ( url.search('manage-car') > -1 ) return 'Gestion des véhicules';
      if ( url.search('manage-place') > -1 ) return 'Gestion des sites';
      if ( url.search('booking-confirm') > -1 ) return 'Gestion des prêts';
      if ( url.search('show-report') > -1 ) return 'Gestion des incidents';
    }
    return 'Parc véhicules';
  }

  onClickMenuIcon() {
    this.showMenu.emit();
  }

}
