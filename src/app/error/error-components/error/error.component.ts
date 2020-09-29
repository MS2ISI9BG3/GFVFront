import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params } from '@angular/router';

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
    private activatedRoute: ActivatedRoute
  ) { }

  /**
   * Initilise le composant avec les données contenu dans la route
   * @memberof ErrorComponent
   */
  ngOnInit() {
    this.routeParams = this.activatedRoute.snapshot.queryParams;
    this.data = this.activatedRoute.snapshot.data;
  }

}