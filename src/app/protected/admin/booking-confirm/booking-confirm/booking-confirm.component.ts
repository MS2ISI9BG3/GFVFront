import { Component, OnInit } from '@angular/core';
import {Ride} from '../../../../shared/models/entities/ride';
import {RestRideService} from '../../../../core/services/rest/rest-ride.service';
import {Router} from '@angular/router';
import {isString} from "util";
import { MessagesService } from 'src/app/core/services/messages/messages.service';
import { MatDialog } from '@angular/material';
import {ConfirmDialogComponent} from "../../../../shared/components/confirm-dialog/confirm-dialog.component";

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
    private messagesService: MessagesService,
    public dialog: MatDialog
  ) {
  }

  /**
   * Initialisation de la liste des trajets.
   */
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

  /**
   * Clic sur le bouton permettant de confirmer un trajet par l'admin.
   * @param ride - trajet à confirmer
   */
  onClickConfirmedRide(ride: Ride) {
    this.restRide.confirmedRide(ride)
      .subscribe( (msgRide: {message: string})   => {

        if ( msgRide && msgRide.message ) {

          this.restRide.getRide(ride.rideId.toString()).subscribe( (oneRide: Ride) => {
            this.ridesConfirmed.push(oneRide);
            this.ridesConfirmedFiltered.push(oneRide);
            this.ridesToConfirmed.splice(this.ridesToConfirmed.indexOf(ride), 1);
            this.ridesToConfirmedFiltered.splice(this.ridesToConfirmed.indexOf(ride), 1);

            this.messagesService.openSnackBar(msgRide.message, 3000, 'success');
          });

        } else this.messagesService.openSnackBar('Une erreur est survenue lors de la confirmation du trajet', 5000, 'danger');
      });
  }

  /**
   * Clic sur le bouton permettant de refuser un trajet par l'admin.
   * @param ride - trajet à refuser
   */
  onClickRefusedRide(ride: Ride) {
    this.restRide.refusedRide(ride)
      .subscribe( (msgRide: {message: string}) => {

        if ( msgRide && msgRide.message ) {

          this.restRide.getRide(ride.rideId.toString()).subscribe( (oneRide: Ride) => {
            this.ridesRefused.push(oneRide);
            this.ridesRefusedFiltered.push(oneRide);
            this.ridesToConfirmed.splice(this.ridesToConfirmed.indexOf(ride), 1);
            this.ridesToConfirmedFiltered.splice(this.ridesToConfirmed.indexOf(ride), 1);

            this.messagesService.openSnackBar(msgRide.message, 3000, 'success');
          });

        } else this.messagesService.openSnackBar('Une erreur est survenue lors du refus du trajet', 5000, 'danger');
      });
  }

  /**
   * Clic sur le bouton permettant de valider le retour de la voiture.
   * @param ride - trajet dont on valide le retour de la voiture
   */
  onClickReturnedCar(ride: Ride) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "250px",
      data: {
          title: "Confirmer",
          msg: "Confirmez-vous le retour des clés et la vérification de l'état du véhicule "+ride.car.matricule.toUpperCase()+" ?"}
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log('dialogResult: '+dialogResult);
      if ( dialogResult ) this.updateRetournedCar(ride);
   });
  }

  updateRetournedCar(ride: Ride) {
    this.restRide.returnedCar(ride)
      .subscribe( (msgRide: {message: string}) => {

        if ( msgRide && msgRide.message ) {

          this.restRide.getRide(ride.rideId.toString()).subscribe( (oneRide: Ride) => {
            this.ridesToReturnedCar.push(oneRide);
            this.ridesConfirmed.splice(this.ridesConfirmed.indexOf(ride), 1);
            this.ridesConfirmedFiltered.splice(this.ridesConfirmed.indexOf(ride), 1);

            this.messagesService.openSnackBar(msgRide.message, 3000, 'success');
          });

        } else this.messagesService.openSnackBar('Une erreur est survenue lors de l\'enregistrement du retour du véhicule', 5000, 'danger');
      });
  }

  /**
   * Gestion de l'évenement ajout d'une entrée dans la zone de recherche.
   * Filtre la liste des trajets (minium 3 caractères à saisir dans le champ).
   * @param event - evenement
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
