import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Car } from 'src/app/shared/models/entities/car';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private _cars: Car[] = [];
  private _carsSubject = new BehaviorSubject(this._cars);
  public cars$ = this._carsSubject.asObservable();

  constructor() { }

  nextCars(cars: Car[]) {
    this._cars = cars;
    this._carsSubject.next(this._cars);
  }

  nextCarUpdated(car: Car) {
    if (car) {
      const index = this._cars.findIndex( s => s.carId == car.carId );
      this._cars[index] = car;
      this._carsSubject.next(this._cars);
    }
  }

  nextCarCreated(car: Car) {
    if (car) {
      this._cars.push(car);
      this._carsSubject.next(this._cars);
    }
  }

  nextCarDeleted(car: Car) {
    if (car) {
      let index: number = this._cars.findIndex( s => s.carId == car.carId );
      this._cars.slice(index);
      this._carsSubject.next(this._cars);
    }
  }

}
