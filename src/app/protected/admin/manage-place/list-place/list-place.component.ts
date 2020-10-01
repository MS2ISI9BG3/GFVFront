import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Place } from 'src/app/shared/models/entities/place';
import { RestPlaceService } from 'src/app/core/services/rest/rest-place.service';
import { Router } from '@angular/router';
import { PlacesService } from 'src/app/core/services/datas/places.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { isArray, isString } from 'util';
import { MessagesService } from 'src/app/core/services/messages/messages.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-list-place',
  templateUrl: './list-place.component.html',
  styleUrls: ['./list-place.component.scss']
})
export class ListPlaceComponent implements OnInit {

  /**
   * Tableau contenant tous les lieux
   * @type {Place[]}
   * @memberof ListPlaceComponent
   */
  places: Place[] = [];
  /**
   * Tableau contenant tous les lieux après application des filtres pour affichage
   * @type {Place[]}
   * @memberof ListPlaceComponent
   */
  placesFiltered: Place[] = [];
  public isMobile: boolean = true;

  /**
   * Creates an instance of ListPlaceComponent.
   * @param {RestPlaceService} restPlace Service appel à l'API Rest
   * @param {Router} router Angular Router
   * @param {placesService} placeService Service gérant les lieux
   * @memberof ListPlaceComponent
   */
  constructor(
    private restPlace: RestPlaceService,
    private router: Router,
    private placesService: PlacesService,
    private messageService: MessagesService,
    private deviceDetector: DeviceDetectorService
  ) { }

  /**
   * Initialisation de la liste des lieux
   * @memberof ListPlaceComponent
   */
  ngOnInit() {
    this.isMobile = !this.deviceDetector.isDesktop();
    this.populatePlacesFromApi();
  }

  /**
   * Récupération des sites à afficher à partir de l'API
   * @param {Place} place Un lieu
   * @memberof ListPlaceComponent
   */
  populatePlacesFromApi() {
    this.restPlace.getPlaces()
    .subscribe(places => {

      this.places = places;
      this.placesFiltered = this.removeDeletedPlaces(places);
      this.placesService.nextPlaces(places);
      this.populatePlacesFromService();

    },error => {
      throw new Error(error)
    }), catchError( error => {
      this.messageService.openSnackBar('Erreur serveur', 5000, 'danger', error);
      console.error(error);
      return of([]);
    });
  }

  /**
   * Mise à jour de la liste des sites à afficher
   * @param {Place} place Un lieu
   * @memberof ListPlaceComponent
   */
  populatePlacesFromService() {
    this.placesService.places$.subscribe( places => {
      this.places = places;
      this.placesFiltered = this.removeDeletedPlaces(places);
    });
  }

  /**
   * Supprime les sites supprimés (état archivé) de la liste des lieux à afficher
   * @param {Place} place Un lieu
   * @memberof ListPlaceComponent
   */
  removeDeletedPlaces(places: Place[]) {
    if ( places && isArray(places) ) return places.filter( p => !p.archived );
    return places;
  }

  /**
   * Gestion de l'évenement ajout d'une entrée dans la zone de recherche
   * Filtre la liste des sites (minium 3 caractères à saisir dans le champ)
   * @param {Place} place Un lieu
   * @memberof ListPlaceComponent
   */
  onInputSearch(event: any) {

    try {

      if (!isString(event.toString())) throw new Error();

      const inputValue: string = event.trim().toLocaleLowerCase();

      if ( inputValue.length >= 3 ) {
        this.placesFiltered = this.removeDeletedPlaces(this.places).filter( 
          place => place.siteName.toLocaleLowerCase().search(inputValue) > -1
        );
      } else {
        throw new Error();
      }

    } catch {
      this.placesFiltered = this.removeDeletedPlaces(this.places);
    }

  }

  /**
   * Gestion de l'événèment clic sur un lieu de la liste des lieux
   * @param {Place} place Un lieu
   * @memberof ListPlaceComponent
   */
  onClickPlace(place: Place) {
    //L'id du site est passé en paramètre,
    //la page affichée sera donc en mode consultation d'un site
    this.router.navigate(['/protected/admin/manage-place/one-place'], {
      queryParams: { placeId: place.siteId }
   });
  }

  /**
   * Gestion de l'événement clic sur la boutton d'ajout d'un lieu
   * @memberof ListPlaceComponent
   */
  onClickAddPlace() {
    //L'id du site n'est pas passé en paramètre,
    //la page affichée sera donc en mode création d'un nouveau site
    this.router.navigate(['/protected/admin/manage-place/one-place']);
  }

  /**
   * Gestion de l'événement clic sur la boutton fermer la fenêtre courante
   * @memberof ListPlaceComponent
   */
  onClickClose() {
    this.router.navigate(['/protected/admin']);
  }

}
