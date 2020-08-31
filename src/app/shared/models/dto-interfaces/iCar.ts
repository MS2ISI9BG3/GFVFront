import {IBrand} from "./iBrand";
import {IPlace} from "./iPlace";
import {IModel} from "./iModel";

export interface ICar {

  carId: string;
  name: string;
  registrationNumber: string;
  power: string;
  numberOfSeats: string;
  isArchive: string;
  odometer: string;
  insuranceValidityDate: string;
  serviceDate: string;
  vin: string;
  carBrand: IBrand;
  carModel: IModel;
  carSite: IPlace;
  serviceValidityDate: string;
}
