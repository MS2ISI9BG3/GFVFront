import { Component, OnInit } from '@angular/core';
import { ManagerPlaceService } from '../services/manager-place.service';
import { Place } from 'src/app/shared/models/entities/place';
import { Subject, pipe } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RestPlaceService } from 'src/app/core/services/rest/rest-place.service';

@Component({
  selector: 'app-one-place',
  templateUrl: './one-place.component.html',
  styleUrls: ['./one-place.component.scss']
})
export class OnePlaceComponent implements OnInit {

  /**
   * Liste de tous les lieux
   * @type {Place[]}
   * @memberof OnePlaceComponent
   */
  places: Place[];
  /**
   * Lieu sélectionné pour affichage et modification
   * @type {Place}
   * @memberof OnePlaceComponent
   */
  place: Place;

  /**
   * Active ou non la modification d'un champ
   * @type {boolean}
   * @memberof OnePlaceComponent
   */
  showEditName: boolean = true;
  showEditAddress: boolean = true;
  showEditZipCode: boolean = true;
  showEditCity: boolean = true;
  showEditPhone: boolean = true;

  /**
   * Creates an instance of OnePlaceComponent.
   * @param {ManagerPlaceService} placeService Service de gestion des lieux
   * @param {RestPlaceService} rest Service d'appel à l'API
   * @memberof OnePlaceComponent
   */
  constructor(
    private placeService: ManagerPlaceService,
    private rest: RestPlaceService
  ) { }

  /**
   * Récupère les données des lieux au chargement du composant
   * @memberof OnePlaceComponent
   */
  ngOnInit() {
    this.placeService.$placeSelected
      .subscribe( placeSelected => 
        this.place = placeSelected
      );
    this.placeService.$places
      .subscribe( places => 
        this.places = places
      );
  }

  /**
   * Activation ou non de la modification du champ nom du lieu
   * sur l'événement du clic sur son bouton de modification
   * @memberof OnePlaceComponent
   */
  onClickEditName(): void { this.showEditName = !this.showEditName; }
  /**
   * Activation ou non de la modification du champ adresse du lieu
   * sur l'événement du clic sur son bouton de modification
   * @memberof OnePlaceComponent
   */
  onClickEditAddress(): void { this.showEditAddress = !this.showEditAddress; }
  /**
   * Activation ou non de la modification du champ code postal du lieu
   * sur l'événement du clic sur son bouton de modification
   * @memberof OnePlaceComponent
   */
  onClickEditZipCode(): void { this.showEditZipCode = !this.showEditZipCode; }
  /**
   * Activation ou non de la modification du champ ville du lieu
   * sur l'événement du clic sur son bouton de modification
   * @memberof OnePlaceComponent
   */
  onClickEditCity(): void { this.showEditCity = !this.showEditCity; }
  /**
   * Activation ou non de la modification du champ téléphone du lieu
   * sur l'événement du clic sur son bouton de modification
   * @memberof OnePlaceComponent
   */
  onClickEditPhone(): void { this.showEditPhone = !this.showEditPhone; }

  /**
   * Modification du champ nom du lieu sur l'événement clic
   * @param {*} event
   * @memberof OnePlaceComponent
   */
  onKeyupEditName(event: any): void {
    this.place.name = event.target.value;
    this.updatePlace();
  }
  /**
   * Modification du champ adresse du lieu sur l'événement clic
   * @param {*} event
   * @memberof OnePlaceComponent
   */
  onKeyupEditAddress(event: any): void {
    this.place.address = event.target.value;
    this.updatePlace();
  }
  /**
   * Modification du champ code postal du lieu sur l'événement clic
   * @param {*} event
   * @memberof OnePlaceComponent
   */
  onKeyupEditZipCode(event: any): void {
    this.place.zipCode = event.target.value;
    this.updatePlace();
  }
  /**
   * Modification du champ ville du lieu sur l'événement clic
   * @param {*} event
   * @memberof OnePlaceComponent
   */
  onKeyupEditCity(event: any): void {
    this.place.city = event.target.value;
    this.updatePlace();
  }
  /**
   * Modification du champ téléphone du lieu sur l'événement clic
   * @param {*} event
   * @memberof OnePlaceComponent
   */
  onKeyupEditPhone(event: any): void {
    this.place.phone = event.target.value;
    this.updatePlace();
  }
  /**
   * Modification du champ archive du lieu sur l'événement modifiant l'état du slider
   * @param {*} event
   * @memberof OnePlaceComponent
   */
  onChangeIsArchive(): void {
    this.place.isArchive = !this.place.isArchive;
    this.updatePlace();
  }

  /**
   * Mise à jour du lieu en prennant en compte toutes les
   * modifications éffectuées dans les 1,5 secondes suivant
   * la première modification
   * @memberof OnePlaceComponent
   */
  updatePlace() {
    this.rest.updatePlace(this.place).pipe(
      debounceTime(1500),
      distinctUntilChanged()
    ).subscribe( place => {
      this.placeService.changePlaces(this.places.map(p => p.id == place.id ? place : p));
    });
  }

}
