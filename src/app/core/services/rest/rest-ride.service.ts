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

  /**
   * Ajout d'un trajet dans la base de données.
   * @param ride - trajet à ajouter
   */
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

  /**
   * Modification d'un trajet dans la base de données.
   * @param ride - trajet à modifier
   */
  public updateRide(ride: Ride): Observable<Ride> {
    let iRide: IRide = this.mapperRide.mapIRide(ride);
    return this.http.put<IRide>(this.baseUrl, iRide, this.httpOptions)
      .pipe(
        catchError(error => of(error))
      );
  }

  /**
   * Recherche d'un trajet via son id.
   * @param id - id du trajet recherché
   */
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

  /**
   * Annulation d'un trajet.
   * @param ride - trajet à annuler
   */
  public canceledRide(ride: Ride): Observable<Ride> {
    let iRide: IRide = this.mapperRide.mapIRide(ride);
    return this.http.put<IRide>(this.baseUrl + "canceled/" + ride.rideId, iRide, this.httpOptions)
      .pipe(
        catchError(error => of(error))
      );
  }

  /**
   * Confirmation du trajet par l'admin.
   * @param ride - trajet à confirmer
   */
  public confirmedRide(ride: Ride): Observable<Ride> {
    let iRide: IRide = this.mapperRide.mapIRide(ride);
    return this.http.put<Ride>(this.baseUrl + "confirmed/" + ride.rideId, iRide, this.httpOptions)
      .pipe(
        catchError(error => of(error))
      );
  }

  /**
   * Refus du trajet par l'admin.
   * @param ride - trajet refusé
   */
  public refusedRide(ride: Ride): Observable<Ride> {
    let iRide: IRide = this.mapperRide.mapIRide(ride);
    return this.http.put<Ride>(this.baseUrl + "refused/" + ride.rideId, iRide, this.httpOptions)
      .pipe(
        catchError(error => of(error))
      );
  }

  /**
   * Trajet terminé, permettant de remettre la voiture disponible.
   * @param ride - trajet à terminer pour remettre la voiture disponible
   */
  public returnedCar(ride: (Ride | number)): Observable<Ride> {
    let id = ride instanceof Ride ? ride.rideId : ride;
    return this.http.put<Ride>(this.baseUrl + "returned/" + id, this.httpOptions)
      .pipe(
        catchError(error => of(error))
      );
  }

  /**
   * Suppression du trajet de la base de données.
   * @param ride - trajet à supprimer
   */
  public deleteRide(ride: (Ride | number)): Observable<Ride> {
    let id = ride instanceof Ride ? ride.rideId : ride;
    return this.http.delete(this.baseUrl + id, this.httpOptions)
      .pipe(
        catchError(error => of(error))
      );
  }

  /**
   * Récupération des trajets d'un utilisateur.
   * @param userId - id de l'user dont on récupère les trajets
   */
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

  /**
   * Récupération de tous les trajets.
   */
  public getRides() {
    return this.http.get<IRide[]>(this.baseUrl, this.httpOptions)
      .pipe(
        map(rides => {
            return this.mapperRide.mapRides(rides);
          },
          error => Observable.throw(error)),
        catchError(error => of(error))
      );
  }
}
