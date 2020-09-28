import {Place} from "./place";
import {Car} from "./car";
import {User} from "./user";

export class Ride {

  /**
   * Constructeur du trajet
   * @param rideId
   * @param departureDate
   * @param departureSite
   * @param arrivalDate
   * @param arrivalSite
   * @param car
   * @param description
   * @param user
   */
  constructor(rideId: number, departureDate: string, departureSite: Place, arrivalDate: string, arrivalSite: Place, car: Car, description: string, user: User) {
    this._rideId = rideId;
    this._departureDate = departureDate;
    this._departureSite = departureSite;
    this._arrivalDate = arrivalDate;
    this._arrivalSite = arrivalSite;
    this._car = car;
    this._description = description;
    this._user = user;
  }

  /**
   * Identifiant unique du trajet
   * @private
   * @type {number}
   * @memberof Ride
   */
  private _rideId: number;

  get rideId(): number {
    return this._rideId;
  }

  set rideId(value: number) {
    this._rideId = value;
  }

  /**
   * Date de départ du trajet
   * @private
   * @type {string}
   * @memberof Ride
   */
  private _departureDate: string;

  get departureDate(): string {
    return this._departureDate;
  }

  set departureDate(value: string) {
    this._departureDate = value;
  }

  /**
   * Lieu de départ du trajet
   * @private
   * @type {Place}
   * @memberof Ride
   */
  private _departureSite: Place;

  get departureSite(): Place {
    return this._departureSite;
  }

  set departureSite(value: Place) {
    this._departureSite = value;
  }

  /**
   * Date d'arrivée du trajet
   * @private
   * @type {string}
   * @memberof Ride
   */
  private _arrivalDate: string;

  get arrivalDate(): string {
    return this._arrivalDate;
  }

  set arrivalDate(value: string) {
    this._arrivalDate = value;
  }

  /**
   * Lieu d'arrivée du trajet
   * @private
   * @type {Place}
   * @memberof Ride
   */
  private _arrivalSite: Place;

  get arrivalSite(): Place {
    return this._arrivalSite;
  }

  set arrivalSite(value: Place) {
    this._arrivalSite = value;
  }

  /**
   * Voiture utilisée pour le trajet
   * @private
   * @type {Car}
   * @memberof Ride
   */
  private _car: Car;

  get car(): Car {
    return this._car;
  }

  set car(value: Car) {
    this._car = value;
  }

  /**
   * Description du trajet
   * @private
   * @type {string}
   * @memberof Ride
   */
  private _description: string;

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  /**
   * Utilisateur du trajet
   * @private
   * @type {User}
   * @memberof Ride
   */
  private _user: User;

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }
}
