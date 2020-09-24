import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {Observable, of, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {MapperRideService} from "../mappers/mapper-ride.service";
import {Ride} from "../../../shared/models/entities/ride";
import {IRide} from "../../../shared/models/dto-interfaces/iRide";

@Injectable({
  providedIn: 'root'
})
export class RestRideService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private baseUrl = environment.baseUrl + "api/bookings/";

  constructor(
    private http: HttpClient,
    private mapperRide: MapperRideService
  ) {
  }

  public addRide(ride: Ride): Observable<Ride> {
    let iRide: IRide = this.mapperRide.mapIRide(ride);
    return this.http.post<IRide>(this.baseUrl, iRide, this.httpOptions)
      .pipe(
        map(iRide => {
            return this.mapperRide.mapRide(iRide)
          },
          error => Observable.throw(error)),
        catchError(error => of(error))
      );
  }

  public updateRide(ride: Ride): Observable<Ride> {
    let iRide: IRide = this.mapperRide.mapIRide(ride);
    return this.http.put<IRide>(this.baseUrl, iRide, this.httpOptions)
      .pipe(
        catchError(error => of(error))
      );
  }

  public getRide(id: string): Observable<Ride> {
    return this.http.get<IRide>(this.baseUrl + id, this.httpOptions)
      .pipe(
        map((ride: IRide) => {
            return this.mapperRide.mapRide(ride);
          },
          error => Observable.throw(error)),
        catchError(error => {
          return throwError(error)
        })
      );
  }

  public canceledRide(ride: Ride): Observable<Ride> {
    let iRide: IRide = this.mapperRide.mapIRide(ride);
    return this.http.put<IRide>(this.baseUrl + "canceled/" + ride.rideId, iRide, this.httpOptions)
      .pipe(
        catchError(error => of(error))
      );
  }

  public confirmedRide(ride: Ride): Observable<Ride> {
    let iRide: IRide = this.mapperRide.mapIRide(ride);
    return this.http.put<IRide>(this.baseUrl + "confirmed/" + ride.rideId, iRide, this.httpOptions)
      .pipe(
        catchError(error => of(error))
      );
  }

  public refusedRide(ride: Ride): Observable<Ride> {
    let iRide: IRide = this.mapperRide.mapIRide(ride);
    return this.http.put<IRide>(this.baseUrl + "refused/" + ride.rideId, iRide, this.httpOptions)
      .pipe(
        catchError(error => of(error))
      );
  }

  public deleteRide(ride: (Ride | number)): Observable<Ride> {
    let id = ride instanceof Ride ? ride.rideId : ride;
    return this.http.delete(this.baseUrl + id, this.httpOptions)
      .pipe(
        catchError(error => of(error))
      );
  }

  public getRidesByLogin(userId) {
    return this.http.get<IRide[]>(this.baseUrl + "user/" + userId , this.httpOptions)
      .pipe(
        map(rides => {
            return this.mapperRide.mapRides(rides);
          },
          error => Observable.throw(error)),
        catchError(error => of(error))
      );
  }
}
