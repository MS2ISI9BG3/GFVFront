import {IPlace} from "./iPlace";
import {ICar} from "./iCar";
import {IUser} from "./iUser";

export interface IRide {
  rideId: string;
  departureDate: string;
  departureSite: IPlace;
  arrivalDate: string;
  arrivalSite: IPlace;
  car: ICar;
  description: string;
  user: IUser;
}
