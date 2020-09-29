import {Injectable} from '@angular/core';
import {IRide} from 'src/app/shared/models/dto-interfaces/iRide';
import {Ride} from 'src/app/shared/models/entities/ride';
import {MapperPlaceService} from "./mapper-place.service";
import {MapperCarService} from "./mapper-car.service";
import {MapperUserService} from "./mapper-user.service";

/**
 * Class gérant les transformation de type pour les trajets
 * @export
 * @class MapperRideService
 */
@Injectable({
  providedIn: 'root'
})
export class MapperRideService {

  constructor(private mapperPlace: MapperPlaceService, private mapperCar: MapperCarService, private mapperUser: MapperUserService) {
  }

  /**
   * Transforme une interface de liste de lieu en objet de liste de lieu
   * @param {IRide[]} rides
   * @returns {Ride[]}
   * @memberof MapperRideService
   */
  public mapRides(rides: IRide[]): Ride[] {
    return rides.map(ride => {
      return this.mapRide(ride);
    });
  }

  /**
   * Transforme une interface trajet en objet trajet
   * @param {IRide} ride
   * @returns {Ride}
   * @memberof MapperRideService
   */
  public mapRide(ride: IRide): Ride {
    return new Ride(
      Number(ride.bookingId),
      ride.departureDate,
      this.mapperPlace.mapPlace(ride.departureSite),
      ride.arrivalDate,
      this.mapperPlace.mapPlace(ride.arrivalSite),
      this.mapperCar.mapCar(ride.car),
      ride.description,
      this.mapperUser.mapUser(ride.user),
      ride.bookingStatus
    );
  }

  /**
   * Transforme un objet trajet une interface trajet
   * @param {Ride} ride
   * @returns {IRide[]}
   * @memberof MapperRideService
   */
  mapIRide(ride: Ride): IRide {
    return {
      bookingId: String(ride.rideId),
      departureDate: ride.departureDate,
      departureSite: this.mapperPlace.mapIPlace(ride.departureSite),
      arrivalDate: ride.arrivalDate,
      arrivalSite: this.mapperPlace.mapIPlace(ride.arrivalSite),
      car: this.mapperCar.mapICar(ride.car),
      description: ride.description,
      user: this.mapperUser.mapIUser(ride.user),
      bookingStatus: ride.status
    }
  }
}
