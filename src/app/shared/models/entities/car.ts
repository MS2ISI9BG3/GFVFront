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
  private _id: number;
  /**
   * Nom du lieu
   * @private
   * @type {number}
   * @memberof Car
   */
  private _name: string;
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
  private _isArchive: boolean;

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

  private _serviceDate: string;
  private _vin: string;
  private _carBrand: Brand;
  private _carModel: Model;
  private _carSite: Place;
  private _serviceValidityDate: string;


  /**
   * Creates an instance of Car.
   * @param {number} id Identifiant unique du lieu
   * @param {string} name Nom du lieu
   * @param matricule
   * @param power
   * @param places
   * @param {boolean} [isArchive=false] Est archivé ou non
   * @param odometer
   * @param insuranceDate
   * @param serviceDate
   * @param vin
   * @param carBrand
   * @param carModel
   * @param carSite
   * @param serviceValidityDate
   * @memberof Car
   */


  constructor(id: number, name: string, matricule: string, power: number, places: number, isArchive: boolean, odometer: number, insuranceDate: string, serviceDate: string, vin: string, carBrand: Brand,carModel: Model, carSite: Place, serviceValidityDate: string) {
    this._id = id;
    this._name = name;
    this._matricule = matricule;
    this._power = power;
    this._places = places;
    this._isArchive = Boolean(isArchive);
    this._odometer = odometer;
    this._insuranceDate = insuranceDate;
    this._serviceDate = serviceDate;
    this._vin = vin;
    this._carBrand = carBrand
    this._carModel = carModel
    this._carSite = carSite
    this._serviceValidityDate = serviceValidityDate
  }


  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
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

  get isArchive(): boolean {
    return this._isArchive;
  }

  get odometer(): number {
    return this._odometer;
  }

  get insuranceDate(): string {
    return this._insuranceDate;
  }

  get serviceDate(): string {
    return this._serviceDate;
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






  set name(value: string) {
    this._name = value;
  }

  set matricule(value: string) {
    this._matricule = value;
  }

  set power(value: number) {
    this._power = value;
  }

  set places(value: number) {
    this._places = value;
  }

  set isArchive(value: boolean) {
    this._isArchive = value;
  }

  set odometer(value: number) {
    this._odometer = value;
  }

  set insuranceDate(value: string) {
    this._insuranceDate = value;
  }

  set serviceDate(value: string) {
    this._serviceDate = value;
  }

  set vin(value: string) {
    this._vin = value;
  }

  set serviceValidityDate(value: string) {
    this._serviceValidityDate = value ;
  }

}
