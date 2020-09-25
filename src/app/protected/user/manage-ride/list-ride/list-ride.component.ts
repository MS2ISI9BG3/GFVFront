import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Ride} from "../../../../shared/models/entities/ride";
import {RestRideService} from "../../../../core/services/rest/rest-ride.service";
import {ManagerRideService} from "../services/manager-ride.service";
import {AuthenticationService} from '../../../../core/services/authentication/authentication.service';

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
   * Creates an instance of ListRideComponent.
   * @param {RestRideService} restRide - Service appel à l'API Rest
   * @param {Router} router Angular Router
   * @param {ManagerRideService} rideService - Service gérant les trajets
   * @param userService
   * @memberof ListRideComponent
   */
  constructor(
    private restRide: RestRideService,
    private router: Router,
    private rideService: ManagerRideService,
    private userService: AuthenticationService
  ) {
  }

  /**
   * Initialisation de la liste des trajets
   * @memberof ListRideComponent
   */
  ngOnInit() {
    this.restRide.getRidesByLogin(this.userService.currentUserValue.id)
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

  /**
   * Ajout d'un trajet
   * @memberOf ListRideComponent
   */
  onClickAddRide() {
    this.router.navigate(['/protected/user/manage-ride/one-ride'])
  }
}
