import { Injectable } from '@angular/core';
import { Place } from 'src/app/shared/models/entities/place';
import { RestPlaceService } from 'src/app/core/services/rest/rest-place.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerPlaceService {

  private _places: Place[];
  private _placeSelected: Place;
  private _placesSource: BehaviorSubject<Place[]> = new BehaviorSubject<Place[]>(this._places);
  private _placeSelectedSource: BehaviorSubject<Place> = new BehaviorSubject<Place>(this._placeSelected);
  /**
   * Observable de la liste des lieux gérée par le module
   * @type {Observable<Place[]>}
   * @memberof ManagerPlaceService
   */
  public $places: Observable<Place[]> = this._placesSource.asObservable();
  /**
   * Observable du lieu sélectionné par l'utilisateur
   * @type {Observable<Place[]>}
   * @memberof ManagerPlaceService
   */
  public $placeSelected: Observable<Place> = this._placeSelectedSource.asObservable();

  /**
   * Modifie la valeur de la liste des lieux et
   * permet de diffuser la nouvelle valeur à travers l'observable
   * @param {Place[]} places
   * @memberof ManagerPlaceService
   */
  changePlaces(places: Place[]): void {
    this._places = places;
    this._placesSource.next(this._places);
  }

  /**
   * Modifie la valeur du lieu sélectionné et
   * permet de diffuser la nouvelle valeur à travers l'observable
   * @param {Place[]} places
   * @memberof ManagerPlaceService
   */
  changePlaceSelected(place: Place): void {
    this._placeSelected = place;
    this._placeSelectedSource.next(this._placeSelected);
  }

}
