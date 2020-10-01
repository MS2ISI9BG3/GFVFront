import { Component, OnInit } from '@angular/core';
import {Ride} from '../../../../shared/models/entities/ride';
import {RestRideService} from '../../../../core/services/rest/rest-ride.service';
import {Router} from '@angular/router';
import {isString} from "util";

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
  ridesToConfirmedFiltered: Ride[] = [];
  ridesConfirmed: Ride[] = [];
  ridesConfirmedFiltered: Ride[] = [];
  ridesRefused: Ride[] = [];
  ridesRefusedFiltered: Ride[] = [];
  ridesToReturnedCar: Ride[] = [];

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
    this.populateRides();
  }

  populateRides() {
    this.restRide.getRides()
      .subscribe(rides => {
        this.rides = rides;

        this.rides.forEach(ride => {
          switch (ride.status) {
            case 'VALIDATION_PENDING':
              this.ridesToConfirmed.push(ride);
              this.ridesToConfirmedFiltered.push(ride);
              break;

            case 'CONFIRMED':
              this.ridesConfirmed.push(ride);
              this.ridesConfirmedFiltered.push(ride);
              break;

            case 'REJECTED':
              this.ridesRefused.push(ride);
              this.ridesRefusedFiltered.push(ride);
              break;
          }
        });
      });
  }

  onClickConfirmedRide(ride: Ride) {
    this.restRide.confirmedRide(ride)
      .subscribe(ride => {
        this.ridesConfirmed.push(ride);
        this.ridesConfirmedFiltered.push(ride);
        this.ridesToConfirmed.splice(this.ridesToConfirmed.indexOf(ride), 1);
        this.ridesToConfirmedFiltered.splice(this.ridesToConfirmed.indexOf(ride), 1);
      });
  }

  onClickRefusedRide(ride: Ride) {
    this.restRide.refusedRide(ride)
      .subscribe(ride => {
        this.ridesRefused.push(ride);
        this.ridesRefusedFiltered.push(ride);
        this.ridesToConfirmed.splice(this.ridesToConfirmed.indexOf(ride), 1);
        this.ridesToConfirmedFiltered.splice(this.ridesToConfirmed.indexOf(ride), 1);
      });
  }

  onClickReturnedCar(ride: Ride) {
    this.restRide.returnedCar(ride)
      .subscribe(ride => {
        this.ridesToReturnedCar.push(ride);
        this.ridesConfirmed.splice(this.ridesConfirmed.indexOf(ride), 1);
        this.ridesConfirmedFiltered.splice(this.ridesConfirmed.indexOf(ride), 1);

      })

  }

  /**
   * Gestion de l'évenement ajout d'une entrée dans la zone de recherche
   * Filtre la liste des sites (minium 3 caractères à saisir dans le champ)
   * @param {Place} place Un lieu
   * @memberof ListPlaceComponent
   */
  onInputSearch(event: any) {

    try {

      if (!isString(event.toString())) throw new Error();

      const inputValue: string = event.trim().toLocaleLowerCase();

      if (inputValue.length >= 3) {
        this.ridesToConfirmedFiltered = this.ridesToConfirmed.filter(
          ride => (ride.departureSite.siteName.toLocaleLowerCase().search(inputValue) > -1 || ride.arrivalSite.siteName.toLocaleLowerCase().search(inputValue) > -1 || ride.arrivalDate.toLocaleLowerCase().search(inputValue) > -1 || ride.departureDate.toLocaleLowerCase().search(inputValue) > -1 )
        );
        this.ridesRefusedFiltered = this.ridesRefused.filter(
          ride => (ride.departureSite.siteName.toLocaleLowerCase().search(inputValue) > -1 || ride.arrivalSite.siteName.toLocaleLowerCase().search(inputValue) > -1 || ride.arrivalDate.toLocaleLowerCase().search(inputValue) > -1 || ride.departureDate.toLocaleLowerCase().search(inputValue) > -1 )
        );
        this.ridesConfirmedFiltered = this.ridesConfirmed.filter(
          ride => (ride.departureSite.siteName.toLocaleLowerCase().search(inputValue) > -1 || ride.arrivalSite.siteName.toLocaleLowerCase().search(inputValue) > -1 || ride.arrivalDate.toLocaleLowerCase().search(inputValue) > -1 || ride.departureDate.toLocaleLowerCase().search(inputValue) > -1 )
        );
      } else {
        throw new Error();
      }

    } catch {
    }

  }
}
