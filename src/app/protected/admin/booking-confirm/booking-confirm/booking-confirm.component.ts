import {Component, OnInit} from '@angular/core';
import {Ride} from '../../../../shared/models/entities/ride';
import {RestRideService} from '../../../../core/services/rest/rest-ride.service';
import {Router} from '@angular/router';
import {isString} from "util";
import {MessagesService} from 'src/app/core/services/messages/messages.service';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from "../../../../shared/components/confirm-dialog/confirm-dialog.component";
import {DeviceDetectorService} from 'ngx-device-detector';
import * as moment from 'moment';

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
  public isMobile: boolean = true;
  public dayFormat: string = moment().format('YYYY-MM-DD');
  public noBooking: boolean = false;

  /**
   * Creates an instance of ListRideComponent.
   * @param {RestRideService} restRide - Service appel à l'API Rest
   * @param {Router} router Angular Router
   * @memberof ListRideComponent
   */
  constructor(
    private restRide: RestRideService,
    private messagesService: MessagesService,
    public dialog: MatDialog,
    private deviceDetector: DeviceDetectorService
  ) {
  }

  /**
   * Initialisation de la liste des trajets.
   */
  ngOnInit() {
    this.isMobile = !this.deviceDetector.isDesktop();
    this.populateRides();
  }

  populateRides() {
    this.restRide.getRides()
      .subscribe(rides => {
        this.rides = rides;
        this.noBooking = (this.rides.length == 0);
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
      .subscribe((resRide: Ride) => {

        if (resRide) {

          this.ridesConfirmed.push(resRide);
          this.ridesConfirmedFiltered.push(resRide);
          this.ridesToConfirmed.splice(this.ridesToConfirmed.indexOf(ride), 1);
          this.ridesToConfirmedFiltered.splice(this.ridesToConfirmed.indexOf(ride), 1);

          this.messagesService.openSnackBar('Trajet confirmé', 3000, 'success');

        } else this.messagesService.openSnackBar('Une erreur est survenue lors de la confirmation du trajet', 5000, 'danger');
      });
  }

  /**
   * Clic sur le bouton permettant de refuser un trajet par l'admin.
   * @param ride - trajet à refuser
   */
  onClickRefusedRide(ride: Ride) {
    this.restRide.refusedRide(ride)
      .subscribe((resRide: Ride) => {

        if (resRide) {

          this.ridesRefused.push(resRide);
          this.ridesRefusedFiltered.push(resRide);
          this.ridesToConfirmed.splice(this.ridesToConfirmed.indexOf(ride), 1);
          this.ridesToConfirmedFiltered.splice(this.ridesToConfirmed.indexOf(ride), 1);

          this.messagesService.openSnackBar('Trajet refusé', 3000, 'success');

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
        msg: "Confirmez-vous le retour des clés et la vérification de l'état du véhicule " + ride.car.matricule.toUpperCase() + " ?"
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log('dialogResult: ' + dialogResult);
      if (dialogResult) this.updateRetournedCar(ride);
    });
  }

  updateRetournedCar(ride: Ride) {
    this.restRide.returnedCar(ride)
      .subscribe((resRide: Ride) => {

        if (ride && resRide) {

          this.ridesToReturnedCar.push(resRide);
          this.ridesConfirmed.splice(this.ridesConfirmed.indexOf(ride), 1);
          this.ridesConfirmedFiltered.splice(this.ridesConfirmed.indexOf(ride), 1);

          this.messagesService.openSnackBar('Retour du véhicule confirmé', 3000, 'success');

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
          ride => (ride.departureSite.siteName.toLocaleLowerCase().search(inputValue) > -1 || ride.arrivalSite.siteName.toLocaleLowerCase().search(inputValue) > -1 || ride.user.firstName.toLocaleLowerCase().search(inputValue) > -1 || ride.user.lastName.toLocaleLowerCase().search(inputValue) > -1 || ride.car.matricule.toLocaleLowerCase().search(inputValue) > -1 || ride.car.carBrand.brandName.toLocaleLowerCase().search(inputValue) > -1)
        );
        this.ridesRefusedFiltered = this.ridesRefused.filter(
          ride => (ride.departureSite.siteName.toLocaleLowerCase().search(inputValue) > -1 || ride.arrivalSite.siteName.toLocaleLowerCase().search(inputValue) > -1 || ride.user.firstName.toLocaleLowerCase().search(inputValue) > -1 || ride.user.lastName.toLocaleLowerCase().search(inputValue) > -1 || ride.car.matricule.toLocaleLowerCase().search(inputValue) > -1 || ride.car.carBrand.brandName.toLocaleLowerCase().search(inputValue) > -1)
        );
        this.ridesConfirmedFiltered = this.ridesConfirmed.filter(
          ride => (ride.departureSite.siteName.toLocaleLowerCase().search(inputValue) > -1 || ride.arrivalSite.siteName.toLocaleLowerCase().search(inputValue) > -1 || ride.user.firstName.toLocaleLowerCase().search(inputValue) > -1 || ride.user.lastName.toLocaleLowerCase().search(inputValue) > -1 || ride.car.matricule.toLocaleLowerCase().search(inputValue) > -1 || ride.car.carBrand.brandName.toLocaleLowerCase().search(inputValue) > -1)
        );
      } else {
        throw new Error();
      }

    } catch {
      this.ridesToConfirmedFiltered = this.ridesToConfirmed;
      this.ridesRefusedFiltered = this.ridesRefused;
      this.ridesConfirmedFiltered = this.ridesConfirmed;
    }

  }
}
