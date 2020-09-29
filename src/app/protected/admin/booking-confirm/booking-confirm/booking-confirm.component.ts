import { Component, OnInit } from '@angular/core';
import {Ride} from '../../../../shared/models/entities/ride';
import {RestRideService} from '../../../../core/services/rest/rest-ride.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-booking-confirm',
  templateUrl: './booking-confirm.component.html',
  styleUrls: ['./booking-confirm.component.scss']
})
export class BookingConfirmComponent implements OnInit {

  /**
   * Tableau contenant tous les trajets non archivés
   * @type {Ride[]}
   * @memberof ListRideComponent
   */
  rides: Ride[] = [];

  ridesToConfirmed: Ride[] = [];
  ridesConfirmed: Ride[] = [];
  ridesRefused: Ride[] = [];

  /**
   * Creates an instance of ListRideComponent.
   * @param {RestRideService} restRide - Service appel à l'API Rest
   * @param {Router} router Angular Router
   * @memberof ListRideComponent
   */
  constructor(
    private restRide: RestRideService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.restRide.getRides()
      .subscribe(rides => {
        this.rides = rides;

        this.rides.forEach(ride => {
          switch (ride.status) {
            case 'VALIDATION_PENDING':
              this.ridesToConfirmed.push(ride);
              break;

            case 'CONFIRMED':
              this.ridesConfirmed.push(ride);
              break;

            case 'REJECTED':
              this.ridesRefused.push(ride);
              break;
          }
        });
      });
  }

  populateRides(ride: Ride = null) {

  }

  onClickConfirmedRide(ride: Ride) {
    console.log("== DEBUG CONFIRMED == " + ride);
    this.restRide.confirmedRide(ride)
      .subscribe(ride => {
        this.ridesConfirmed.push(ride);
        this.ridesToConfirmed.splice(this.ridesToConfirmed.indexOf(ride), 1);
      });
  }

  onClickRefusedRide(ride: Ride) {
    console.log("== DEBUG REFUSED == " + ride);
    this.restRide.refusedRide(ride)
      .subscribe(ride => {
        this.ridesRefused.push(ride);
        this.ridesToConfirmed.splice(this.ridesToConfirmed.indexOf(ride), 1);
      });
  }
}
