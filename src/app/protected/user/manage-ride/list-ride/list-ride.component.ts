import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Ride} from "../../../../shared/models/entities/ride";
import {RestRideService} from "../../../../core/services/rest/rest-ride.service";
import {ManagerRideService} from "../services/manager-ride.service";
import {Place} from "../../../../shared/models/entities/place";

@Component({
  selector: 'app-list-ride',
  templateUrl: './list-ride.component.html',
  styleUrls: ['./list-ride.component.scss']
})
export class ListRideComponent implements OnInit {

  /**
   * Tableau contenant tous les trajets non archivés
   * @type {Ride[]}
   * @memberof ListRideComponent
   */
  rides: Ride[] = [];

  /**
   * Tableau contenant tous les lieux après application des filtres pour affichage
   * @type {Place[]}
   * @memberof ListPlaceComponent
   */
  ridesFiltered: Ride[] = [];

  /**
   * Creates an instance of ListRideComponent.
   * @param {RestRideService} restRide - Service appel à l'API Rest
   * @param {Router} router Angular Router
   * @param {ManagerRideService} rideService - Service gérant les trajets
   * @memberof ListRideComponent
   */
  constructor(
    private restRide: RestRideService,
    private router: Router,
    private rideService: ManagerRideService
  ) {
  }

  /**
   * Initialisation de la liste des trajets
   * @memberof ListRideComponent
   */
  ngOnInit() {
    this.restRide.getRides()
      .subscribe(rides => {
        this.rides = rides;
        this.rideService.changeRides(rides);
      });
    this.rideService.$rides
      .subscribe(rides =>
        this.rides = rides
      );
  }

  /**
   * Gestion de l'événèment clic sur un trajet de la liste des trajets
   * @param {Ride} ride - Un trajet
   * @memberof ListRideComponent
   */
  onClickRide(ride: Ride) {
    this.rideService.changeRideSelected(ride);
    this.router.navigate(['/protected/user/manage-ride/one-ride'], {
      queryParams: {rideId: ride.rideId}
    });
  }


}
