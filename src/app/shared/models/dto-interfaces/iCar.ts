import {IBrand} from "./iBrand";
import {IPlace} from "./iPlace";
import {IModel} from "./iModel";

export interface ICar {

  carId: string;
  registrationNumber: string;
  power: string;
  numberOfSeats: string;
  isArchive: string;
  odometer: string;
  insuranceValidityDate: string;
  vin: string;
  carBrand: IBrand;
  carModel: IModel;
  carSite: IPlace;
  serviceValidityDate: string;
  archived: string;
}
