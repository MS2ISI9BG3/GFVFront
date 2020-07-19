import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { User } from 'src/app/shared/models/entities/user';
import { Router, NavigationEnd } from '@angular/router';
import { pipe } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss']
})
export class MenuHeaderComponent implements OnInit {

  @Output() showMenu = new EventEmitter();
  public user: User;
  public title: string = 'Parc véhivules';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.authenticationService.currentUserValue;
    this.initTitle();
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
        this.title = this.getTitle(event.url);
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
      if ( url.search('booking-ride') > 0 ) return 'Emprunts';
      if ( url.search('manage-ride') > 0 ) return 'Trajets';
      if ( url.search('manage-user') > 0 ) return 'Gestion des employés';
      if ( url.search('manage-car') > 0 ) return 'Gestion des véhicules';
      if ( url.search('manage-place') > 0 ) return 'Gestion des sites';
      if ( url.search('booking-confirm') > 0 ) return 'Gestion des prêts';
      if ( url.search('show-report') > 0 ) return 'Gestion des incidents';
    }
    return 'Parc véhicules';
  }

  onClickMenuIcon() {
    this.showMenu.emit();
  }

}
