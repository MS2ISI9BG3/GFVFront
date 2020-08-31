import { Injectable } from '@angular/core';
import {ICar} from "../../../shared/models/dto-interfaces/iCar";
import {Car} from "../../../shared/models/entities/car";
import {MapperBrandService} from "./mapper-brand.service";
import {MapperModelService} from "./mapper-model.service";
import {MapperPlaceService} from "./mapper-place.service";

@Injectable({
  providedIn: 'root'
})
export class MapperCarService {

  constructor(private mapperBrand : MapperBrandService,private mapperModel : MapperModelService,private mapperSite : MapperPlaceService) {
  }

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
      Number(car.carId),
      car.registrationNumber,
      Number(car.power),
      Number(car.numberOfSeats),
      Boolean(car.isArchive),
      Number(car.odometer),
      car.insuranceValidityDate,
      car.vin,
      this.mapperBrand.mapBrand(car.carBrand),
      this.mapperModel.mapModel(car.carModel),
      this.mapperSite.mapPlace(car.carSite),
      car.serviceValidityDate,
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
      carId: String(car.id),
      registrationNumber: car.matricule,
      power: String(car.power),
      numberOfSeats: String(car.places),
      isArchive: String(car.isArchive),
      odometer: String(car.odometer),
      insuranceValidityDate: car.insuranceDate,
      vin: car.vin,
      carBrand: this.mapperBrand.mapIBrand(car.carBrand),
      carModel: this.mapperModel.mapIModel(car.carModel),
      carSite: this.mapperSite.mapIPlace(car.carSite),
      serviceValidityDate: car.serviceValidityDate,
    }
  }
}
