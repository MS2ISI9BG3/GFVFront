import { Injectable } from '@angular/core';
import { Car } from 'src/app/shared/models/entities/car';
import { RestCarService } from 'src/app/core/services/rest/rest-car.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {Place} from "../../../../shared/models/entities/place";

@Injectable({
  providedIn: 'root'
})
export class ManagerCarService {

  private _cars: Car[];
  private _carSelected: Car;
  private _carsSource: BehaviorSubject<Car[]> = new BehaviorSubject<Car[]>(this._cars);
  private _carSelectedSource: BehaviorSubject<Car> = new BehaviorSubject<Car>(this._carSelected);
  /**
   * Observable de la liste des lieux gérée par le module
   * @type {Observable<Car[]>}
   * @memberof ManagerCarService
   */
  public $cars: Observable<Car[]> = this._carsSource.asObservable();
  /**
   * Observable du lieu sélectionné par l'utilisateur
   * @type {Observable<Car[]>}
   * @memberof ManagerCarService
   */
  public $carSelected: Observable<Car> = this._carSelectedSource.asObservable();

  /**
   * Modifie la valeur de la liste des lieux et
   * permet de diffuser la nouvelle valeur à travers l'observable
   * @param {Car[]} cars
   * @memberof ManagerCarService
   */
  changeCars(cars: Car[]): void {
    this._cars = cars;
    this._carsSource.next(this._cars);
  }

  nextCars(cars: Car[]) {
    this._cars = cars;
    this._carsSource.next(this._cars);
  }

  /**
   * Modifie la valeur du lieu sélectionné et
   * permet de diffuser la nouvelle valeur à travers l'observable
   * @param {Car[]} cars
   * @memberof ManagerCarService
   */
  changeCarSelected(car: Car): void {
    this._carSelected = car;
    this._carSelectedSource.next(this._carSelected);
  }

}
