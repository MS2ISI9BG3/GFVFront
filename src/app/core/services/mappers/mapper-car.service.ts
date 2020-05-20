import { Injectable } from '@angular/core';
import {ICar} from "../../../shared/models/dto-interfaces/iCar";
import {Car} from "../../../shared/models/entities/car";

@Injectable({
  providedIn: 'root'
})
export class MapperCarService {

  /**
   * Transforme une interface de liste de lieu en objet de liste de lieu
   * @param {ICar[]} cars
   * @returns {Car[]}
   * @memberof MapperCarService
   */
  public mapCars(cars: ICar[]): Car[] {
    return cars.map(car => {
      return this.mapCar(car);
    });
  }

  /**
   * Transforme une interface lieu en objet lieu
   * @param {ICar[]} cars
   * @returns {Car[]}
   * @memberof MapperCarService
   */
  public mapCar(car: ICar): Car {
    return new Car(
      Number(car.id),
      car.name,
      Number(car.matricule),
      Number(car.power),
      Number(car.places),
      Number(car.odometer),
      car.insurance_date,
      car.service_date,
      Boolean(car.isArchive)
    );
  }

  /**
   * Transforme un objet lieu une interface lieu
   * @param {ICar[]} cars
   * @returns {Car[]}
   * @memberof MapperCarService
   */
  mapICar(car: Car): ICar {
    return {
      id: String(car.id),
      name: car.name,
      matricule: String(car.matricule),
      power: String(car.power),
      places: String(car.places),
      odometer: String(car.odometer),
      insurance_date: car.insurance_date,
      service_date: car.service_date,
      isArchive: String(car.isArchive)
    }
  }
}
