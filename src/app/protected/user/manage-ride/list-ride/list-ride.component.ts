import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Ride} from "../../../../shared/models/entities/ride";
import {RestRideService} from "../../../../core/services/rest/rest-ride.service";
import {ManagerRideService} from "../services/manager-ride.service";
import {AuthenticationService} from '../../../../core/services/authentication/authentication.service';
import * as moment from 'moment';

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
    private route: ActivatedRoute,
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
    this.route.params.subscribe( params => {
      if ( !params['rideType'] ) this.router.navigate(['/error']);
      if ( params['rideType'] != 'current' && params['rideType'] != 'history' ) this.router.navigate(['/error']);
      const type: 'current' | 'history' = params['rideType'];

      this.getRides(type);

    });
  }

  getRides(routeType: 'current' | 'history') {
    this.restRide.getRidesByLogin(this.userService.currentUserValue.id)
      .subscribe( (rides: Ride[]) => {
        //this.rides = rides;
        if (rides) this.populateRides(rides, routeType);
        if (this.rides) this.rideService.changeRides(this.rides);
      });
    this.rideService.$rides
      .subscribe( (rides: Ride[]) => {
        //this.rides = rides
        if (rides) this.populateRides(rides, routeType)
      });
  }

  populateRides(rides: Ride[], routeType: 'current' | 'history') {
    //if (rides) console.log('DATE RIDE: '+rides[0].arrivalDate);
    //if (rides) console.log('DATE RIDE MOMENT: '+moment(rides[0].arrivalDate).format('DD MM YYYY'));
    if ( routeType == 'current' ) {
      this.rides = rides.filter( r => r.status != 'REJECTED' ) .filter( r => moment(r.arrivalDate, 'YYYY-MM-DD').isSameOrAfter(moment(), 'day') );
      this.rideSort(true);
    } else
    if ( routeType == 'history' ) {
      this.rides = rides.filter( r => r.status == 'REJECTED' || (r.status != 'REJECTED' && moment(r.arrivalDate, 'YYYY-MM-DD').isBefore(moment(), 'day')) );
      this.rideSort(false);
    } else this.rides = [];
  }

  rideSort(chronoSort: boolean){
    this.rides = this.rides.sort( (r1, r2) => 
        moment(r1.departureDate, 'YYYY-MM-DD') > moment(r2.departureDate, 'YYYY-MM-DD') ? (chronoSort ? 1 : -1) :
        moment(r1.departureDate, 'YYYY-MM-DD') < moment(r2.departureDate, 'YYYY-MM-DD') ? (chronoSort ? -1 : 1) : 0
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

  /**
   * Gestion de l'événement clic sur la boutton fermer la fenêtre courante
   * @memberof ListPlaceComponent
   */
  onClickClose() {
    this.router.navigate(['/public']); //TODO navigate to home
  }

}
