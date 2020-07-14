import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Place } from 'src/app/shared/models/entities/place';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _places: Place[] = [];
  private _placesSubject = new BehaviorSubject(this._places);
  public places$ = this._placesSubject.asObservable();

  constructor() { }

  nextPlaces(places: Place[]) {
    this._places = places;
    this._placesSubject.next(this._places);
  }

  nextPlaceUpdated(place: Place) {
    if (place) {
      const index = this._places.findIndex( s => s.siteId == place.siteId );
      this._places[index] = place;
      this._placesSubject.next(this._places);
    }
  }

  nextPlaceCreated(place: Place) {
    if (place) {
      this._places.push(place);
      this._placesSubject.next(this._places);
    }
  }

  nextPlaceDeleted(place: Place) {
    if (place) {
      let index: number = this._places.findIndex( s => s.siteId == place.siteId );
      this._places.slice(index);
      this._placesSubject.next(this._places);
    }
  }

}
