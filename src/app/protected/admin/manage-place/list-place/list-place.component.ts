import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/shared/models/entities/place';
import { ManagerPlaceService } from '../services/manager-place.service';
import { RestPlaceService } from 'src/app/core/services/rest/rest-place.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-place',
  templateUrl: './list-place.component.html',
  styleUrls: ['./list-place.component.scss']
})
export class ListPlaceComponent implements OnInit {

  /**
   * Tableau contenant tous les lieux non archivés
   * @type {Place[]}
   * @memberof ListPlaceComponent
   */
  places: Place[] = [];

  /**
   * Creates an instance of ListPlaceComponent.
   * @param {RestPlaceService} restPlace Service appel à l'API Rest
   * @param {Router} router Angular Router
   * @param {ManagerPlaceService} placeService Service gérant les lieux
   * @memberof ListPlaceComponent
   */
  constructor(
    private restPlace: RestPlaceService,
    private router: Router,
    private placeService: ManagerPlaceService
  ) { }

  /**
   * Initialisation de la liste des lieux
   * @memberof ListPlaceComponent
   */
  ngOnInit() {
    this.restPlace.getPlaces()
      .subscribe(places => {
        this.places = places;
        this.placeService.changePlaces(places);
      });
    this.placeService.$places
      .subscribe(places => 
        this.places = places
      );
  }

  /**
   * Gestion de l'événèment clic sur un lieu de la liste des lieux
   * @param {Place} place Un lieu
   * @memberof ListPlaceComponent
   */
  onClickPlace(place: Place) {
    this.placeService.changePlaceSelected(place);
    this.router.navigate(['/protected/admin/manage-place/one-place']);
  }

  /**
   * Gestion de l'événement clic sur la corbeille d'un lieu
   * @param {Place} place Un lieu
   * @memberof ListPlaceComponent
   */
  onClickDelete(place: Place) {
    this.restPlace.deletePlace(place).subscribe( p =>
      this.placeService.changePlaces(this.places.splice(this.places.findIndex(p => p.id == place.id), 1))
    );
  }

}
