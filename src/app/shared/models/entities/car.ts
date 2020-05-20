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

  private _matricule: number;
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

  private _insurance_date: string;
  /**
   * Nom du lieu
   * @private
   * @type {number}
   * @memberof Car
   */

  private _service_date: string;


  /**
   * Creates an instance of Car.
   * @param {number} id Identifiant unique du lieu
   * @param {string} name Nom du lieu
   * @param {boolean} [isArchive=false] Est archivé ou non
   * @memberof Car
   */


  constructor(id: number, name: string, matricule: number, power: number, places: number, isArchive: number, odometer: string, insurance_date: string, service_date: boolean) {
    this._id = id;
    this._name = name;
    this._matricule = matricule;
    this._power = power;
    this._places = places;
    this._isArchive = Boolean(isArchive);
    this._odometer = odometer;
    this._insurance_date = insurance_date;
    this._service_date = service_date;
  }


  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get matricule(): number {
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

  get insurance_date(): string {
    return this._insurance_date;
  }

  get service_date(): string {
    return this._service_date;
  }


  set name(value: string) {
    this._name = value;
  }

  set matricule(value: number) {
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

  set insurance_date(value: string) {
    this._insurance_date = value;
  }

  set service_date(value: string) {
    this._service_date = value;
  }
}
