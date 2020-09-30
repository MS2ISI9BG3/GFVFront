import {Brand} from "./brand";
import {Place} from "./place";
import {Model} from "./model";

export class Car {

  /**
   * Identifiant unique du lieu
   * @private
   * @type {number}
   * @memberof Car
   */
  private _carId: number;

  /**
   * Adresse (numéro et rue) du lieu
   * @private
   * @type {number}
   * @memberof Car
   */

  private _matricule: string;
  /**
   * Nom du lieu
   * @private
   * @type {number}
   * @memberof Car
   */
  private _power: number;
  /**
   * Nom du lieu
   * @private
   * @type {number}
   * @memberof Car
   */
  private _places: number;
  /**
   * Nom du lieu
   * @private
   * @type {number}
   * @memberof Car
   */

  /**
   * Nom du lieu
   * @private
   * @type {number}
   * @memberof Car
   */

  private _odometer: number;
  /**
   * Nom du lieu
   * @private
   * @type {number}
   * @memberof Car
   */

  private _insuranceDate: string;
  /**
   * Nom du lieu
   * @private
   * @type {number}
   * @memberof Car
   */

  private _vin: string;
  private _carBrand: Brand;
  private _carModel: Model;
  private _carSite: Place;
  private _serviceValidityDate: string;
  private _carStatus: string;


  /**
   * Creates an instance of Car.
   * @param carId
   * @param matricule
   * @param power
   * @param places
   * @param {boolean} [isArchive=false] Est archivé ou non
   * @param odometer
   * @param insuranceDate
   * @param vin
   * @param carBrand
   * @param carModel
   * @param carSite
   * @param serviceValidityDate
   * @param carStatus
   * @memberof Car
   */


  constructor(carId: number, matricule: string, power: number, places: number, odometer: number, insuranceDate: string, vin: string, carBrand: Brand,carModel: Model, carSite: Place, serviceValidityDate: string, carStatus : string) {
    this._carId = carId;
    this._matricule = matricule;
    this._power = power;
    this._places = places;
    this._odometer = odometer;
    this._insuranceDate = insuranceDate;
    this._vin = vin;
    this._carBrand = carBrand
    this._carModel = carModel
    this._carSite = carSite
    this._serviceValidityDate = serviceValidityDate
    this._carStatus = carStatus

  }


  get carId(): number {
    return this._carId;
  }


  get matricule(): string {
    return this._matricule;
  }

  get power(): number {
    return this._power;
  }

  get places(): number {
    return this._places;
  }


  get odometer(): number {
    return this._odometer;
  }

  get insuranceDate(): string {
    return this._insuranceDate;
  }

  get vin(): string {
    return this._vin;
  }

  get carBrand(): Brand {
    return this._carBrand;
  }

  get carModel(): Model {
    return this._carModel;
  }

  get carSite(): Place {
    return this._carSite;
  }
  get serviceValidityDate(): string {
    return this._serviceValidityDate;
  }

  get carStatus(): string { return this._carStatus }




  set matricule(value: string) {
    this._matricule = value;
  }

  set power(value: number) {
    this._power = value;
  }

  set places(value: number) {
    this._places = value;
  }

  set odometer(value: number) {
    this._odometer = value;
  }

  set insuranceDate(value: string) {
    this._insuranceDate = value;
  }

  set carBrand(carBrand: Brand) {
    this._carBrand = carBrand;
  }

  set carModel(carModel: Model) {
    this._carModel = carModel;
  }

  set carSite(carSite: Place) {
    this._carSite = carSite;
  }

  set carStatus( carStatus: string ) { this._carStatus = carStatus }





  set vin(value: string) {
    this._vin = value;
  }

  set serviceValidityDate(value: string) {
    this._serviceValidityDate = value ;
  }

}
