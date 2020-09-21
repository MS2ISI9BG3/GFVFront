import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Ride} from 'src/app/shared/models/entities/ride';

@Injectable({
  providedIn: 'root'
})
export class ManagerRideService {

  private _rides: Ride[];
  private _rideSelected: Ride;
  private _ridesSource: BehaviorSubject<Ride[]> = new BehaviorSubject<Ride[]>(this._rides);
  /**
   * Observable de la liste des trajets gérée par le module
   * @type {Observable<Ride[]>}
   * @memberof ManagerRideService
   */
  public $rides: Observable<Ride[]> = this._ridesSource.asObservable();
  private _rideSelectedSource: BehaviorSubject<Ride> = new BehaviorSubject<Ride>(this._rideSelected);
  /**
   * Observable du lieu sélectionné par l'utilisateur
   * @type {Observable<Ride[]>}
   * @memberof ManagerRideService
   */
  public $rideSelected: Observable<Ride> = this._rideSelectedSource.asObservable();

  /**
   * Modifie la valeur de la liste des trajets et
   * permet de diffuser la nouvelle valeur à travers l'observable
   * @param {Ride[]} rides
   * @memberof ManagerRideService
   */
  changeRides(rides: Ride[]): void {
    this._rides = rides;
    this._ridesSource.next(this._rides);
  }

  /**
   * Modifie la valeur du trajet sélectionné et
   * permet de diffuser la nouvelle valeur à travers l'observable
   * @param {Ride[]} ride
   * @memberof ManagerRideService
   */
  changeRideSelected(ride: Ride): void {
    this._rideSelected = ride;
    this._rideSelectedSource.next(this._rideSelected);
  }
}
