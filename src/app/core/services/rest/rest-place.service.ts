import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Place } from 'src/app/shared/models/entities/place';
import { IPlace } from 'src/app/shared/models/dto-interfaces/iPlace';
import { MapperPlaceService } from '../mappers/mapper-place.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestPlaceService {

  private baseUrl = environment.baseUrl+"api/place/";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private mapperPlace: MapperPlaceService
  ) { }

  public getPlaces() {
    return this.http.get<IPlace[]>(this.baseUrl, this.httpOptions)
      .pipe(
        map(places => {
          return this.mapperPlace.mapPlaces(places);
        },
        error => Observable.throw(error)),
        catchError(error => of(error))
      );
  }

  public addPlace(place: Place): Observable<Place> {
    let iPlace: IPlace = this.mapperPlace.mapIPlace(place);
    return this.http.post<IPlace>(this.baseUrl, iPlace, this.httpOptions)
      .pipe(
        map(iPlace => {
          return this.mapperPlace.mapPlace(iPlace)
        }, 
        error => Observable.throw(error)),
        catchError(error => of(error))
      );
  }

  public updatePlace(place: Place): Observable<Place> {
    let iPlace: IPlace = this.mapperPlace.mapIPlace(place);
    return this.http.put<IPlace>(this.baseUrl, iPlace, this.httpOptions)
      .pipe(
        catchError(error => of(error))
      );
  }

  public deletePlace(place: (Place | number)): Observable<Place> {
    let id = place instanceof Place ? place.id : place;
    return this.http.delete(`${this.baseUrl}+${id}`, this.httpOptions)
      .pipe(
        catchError(error => of(error))
      );
  }
}
