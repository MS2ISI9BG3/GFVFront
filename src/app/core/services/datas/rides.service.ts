import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Ride} from 'src/app/shared/models/entities/ride';

@Injectable({
  providedIn: 'root'
})
export class RidesService {

  private _rides: Ride[] = [];
  private _ridesSubject = new BehaviorSubject(this._rides);
  public rides$ = this._ridesSubject.asObservable();

  constructor() {
  }

  nextRides(rides: Ride[]) {
    this._rides = rides;
    this._ridesSubject.next(this._rides);
  }

  nextRideUpdated(ride: Ride) {
    if (ride) {
      const index = this._rides.findIndex(s => s.rideId == ride.rideId);
      this._rides[index] = ride;
      this._ridesSubject.next(this._rides);
    }
  }

  nextRideCreated(ride: Ride) {
    if (ride) {
      this._rides.push(ride);
      this._ridesSubject.next(this._rides);
    }
  }

  nextRideDeleted(ride: Ride) {
    if (ride) {
      let index: number = this._rides.findIndex(s => s.rideId == ride.rideId);
      this._rides.slice(index);
      this._ridesSubject.next(this._rides);
    }
  }
}
