import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  /**
   * Paramètres de la route
   * @type {Params}
   * @memberof ErrorComponent
   */
  routeParams: Params;
  /**
   * Données contenu dans la route
   * @type {Data}
   * @memberof ErrorComponent
   */
  data: Data;

  /**
   * Creates an instance of ErrorComponent.
   * @param {ActivatedRoute} activatedRoute
   * @memberof ErrorComponent
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  /**
   * Initilise le composant avec les données contenu dans la route
   * @memberof ErrorComponent
   */
  ngOnInit() {
    this.routeParams = this.activatedRoute.snapshot.queryParams;
    this.data = this.activatedRoute.snapshot.data;
  }

  onClickHref() {
    if ( this.authenticationService.currentUserValue.isAdmin ) {
      this.router.navigate(['/protected/admin'])
    } else this.router.navigate(['/']);
  }

}