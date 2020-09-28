import { Component, OnInit } from '@angular/core';
import { catchError } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessagesService } from "../../../../core/services/messages/messages.service";
import { MatDialog } from "@angular/material/dialog";
import { of } from "rxjs";
import { FormMode } from "../../../../shared/enums/formMode";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmDialogComponent } from "../../../../shared/components/confirm-dialog/confirm-dialog.component";
import { isArray } from "util";

import { Car } from "../../../../shared/models/entities/car";
import { RestCarService } from "../../../../core/services/rest/rest-car.service";
import { Place } from "../../../../shared/models/entities/place";
import { RestPlaceService } from "../../../../core/services/rest/rest-place.service";
import { Ride } from '../../../../shared/models/entities/ride';
import { RestRideService } from '../../../../core/services/rest/rest-ride.service';
import { RidesService } from '../../../../core/services/datas/rides.service';
import {AuthenticationService} from '../../../../core/services/authentication/authentication.service';

@Component({
  selector: 'app-one-ride',
  templateUrl: './one-ride.component.html',
  styleUrls: ['./one-ride.component.scss']
})
export class OneRideComponent implements OnInit {

  /**
   * Gère les valeurs des champs du formulaire ainsi que leur validité
   * @type {FormGroup}
   * @memberof OneRideComponent
   */
  public rideForm: FormGroup;
  public ride: Ride;
  public queryRideId: string = null; // Null: add place, id: show and update place
  public isToUpdate: boolean = false;
  public cars: Car[];
  public selectCar: Car;
  public sites: Place[];
  public selectDepartureSite: Place;
  public selectArrivalSite: Place;
  public formMode: FormMode = FormMode.show;

  /**
   * Liste de tous les lieux
   * @type {Car[]}
   * @memberof OneCarComponent
   */
  rides: Ride[];

  /**
   * Creates an instance of OneCarComponent.
   * @param formBuilder
   * @param router
   * @param activatedRoute
   * @param restCar
   * @param restRide
   * @param ridesService
   * @param messagesService
   * @param dialog
   * @param restSite
   * @param userService
   * @memberof OneCarComponent
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private restRide: RestRideService,
    private ridesService: RidesService,
    private messagesService: MessagesService,
    public dialog: MatDialog,
    private restCar: RestCarService,
    private restSite: RestPlaceService,
    private userService: AuthenticationService
  ) {
    this.rideForm = this.formBuilder.group({
      departureDate: ['', Validators.required],
      departureSite: ['', Validators.required],
      arrivalDate: [''],
      arrivalSite: [''],
      car: ['', Validators.required],
      description: ['']
    });
  }

  /**
   * Récupère les données des lieux au chargement du composant
   * @memberof OneCarComponent
   */
  ngOnInit() {
    this.rideForm.reset();
    this.populateQueryParams();
    this.populateSites();
    this.queryRideId ? this.showAndUpdateRide(this.queryRideId) : this.createRide();
  }

  public compareWithFnDepartureSite = (currentSite: Place) => {
    if (!this.ride) return false;
    return currentSite.siteId == this.ride.departureSite.siteId;
  };

  public compareWithFnArrivalSite = (currentSite: Place) => {
    if (!this.ride) return false;
    return currentSite.siteId == this.ride.arrivalSite.siteId;
  };

  public compareWithFnCar = (currentCar: Car) => {
    if (!this.ride) return false;
    return currentCar.carId == this.ride.car.carId;
  };

  /**
   * Initialisation du mode affichage et mise à jour d'un trajet
   * @readonly
   * @memberof OneRideComponent
   */
  showAndUpdateRide(queryRideId: string) {
    this.populateRide(queryRideId);
  }

  /**
   * Initialisation du mode création d'un nouveau trajet
   * @readonly
   * @memberof OneRideComponent
   */
  createRide() {
    this.formMode = FormMode.create;
    this.updateDefaultFormValue(this.formMode)
  };

  /**
   * Récupération des données du trajet pour affichage
   * @readonly
   * @memberof OneRideComponent
   */
  populateRide(queryRideId: string) {
    this.restRide.getRide(queryRideId)
      .subscribe(ride => {
          this.ride = ride;
          this.updateDefaultFormValue(FormMode.show, ride);
        },
        (error => {
          throw new Error(error)
        })
      ), catchError((error: any) => {
        this.messagesService.openSnackBar('Une erreur interne est survenue', 5000, 'danger', error);
        return of([]);
      });
  }


  /**
   * Mise à jour des valeurs du formulaire du trajet
   * Mode création : champs vides
   * Mode affichage et mise à jour : champs préremplis avec les valeurs du trajets
   * @readonly
   * @memberof OneRideComponent
   */
  updateDefaultFormValue(formMode: FormMode, ride?: Ride) {
    console.log('Ride: ' + JSON.stringify(ride));
    if ((formMode == FormMode.show || formMode == FormMode.update) && ride) {
      this.f.departureDate.setValue(ride.departureDate);
      this.selectDepartureSite = ride.departureSite;
      this.f.departureSite.setValue(ride.departureSite.siteName);
      if (ride.arrivalDate) this.f.arrivalDate.setValue(ride.arrivalDate);
      if (ride.arrivalSite) this.selectArrivalSite = ride.arrivalSite;
      if (ride.arrivalSite) this.f.arrivalSite.setValue(ride.arrivalSite.siteName);
      this.selectCar = ride.car;
      this.f.car.setValue(ride.car.carBrand.brandName + '' + ride.car.carModel.modelName + ' ' + ride.car.matricule);
      if (ride.description) this.f.description.setValue(ride.description);
    }
    else {
      this.f.departureDate.setValue('');
      this.f.departureSite.setValue('');
      this.f.arrivalDate.setValue('');
      this.f.arrivalSite.setValue('');
      this.f.car.setValue('');
      this.f.description.setValue('');
    }
  }


  /**
   * Récupération de l'id du trajet passé en paramètre de la route
   * @readonly
   * @memberof OneRideComponent
   */
  populateQueryParams() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryRideId = params['rideId'] ? params['rideId'] : null;
    });
  }

  /**
   * Renvoie les controles des champs du formulaire
   * @readonly
   * @memberof OneRideComponent
   */
  get f() {
    return this.rideForm.controls;
  }

  get departureDateFormControl() {
    return this.rideForm.get('departureDate')
  }

  get departureSiteFormControl() {
    return this.rideForm.get('departureSite')
  }

  get arrivalDateFormControl() {
    return this.rideForm.get('arrivalDate')
  }

  get arrivalSiteFormControl() {
    return this.rideForm.get('arrivalSite')
  }

  get carFormControl() {
    return this.rideForm.get('car')
  }

  get descriptionFormControl() {
    return this.rideForm.get('description')
  }

  /**
   * Gestion du clic sur le bouton d'action
   * @readonly
   * @memberof OneRideComponent
   */
  onClickBtnRide(formMode: FormMode) {
    if (formMode == FormMode.create) {
      this.addRide();
      this.formMode = FormMode.show;
      return
    }
    else if (formMode == FormMode.show) {
      this.formMode = FormMode.update;
      return
    }
    else if (formMode == FormMode.update) {
      this.updateRide();
      this.formMode = FormMode.show;
      return
    }
  }

  /**
   * Gestion du clic sur le bouton suppression
   * @readonly
   * @memberof OneRideComponent
   */
  onClickDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "250px",
      data: {
        title: "Confirmer",
        msg: "Le trajet du " + this.ride.departureDate + " va être supprimé"
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log('dialogResult: ' + dialogResult);
      if (dialogResult) this.updateRide(true);
    });
  }


  /**
   * Ajout d'un trajet
   * @returns
   * @memberof OneRideComponent
   */
  addRide() {
    if (this.rideForm.invalid) {
      return;
    }

    try {
      let ride = new Ride(
        null,
        this.rideForm.value.departureDate,
        this.rideForm.value.departureSite,
        this.rideForm.value.arrivalDate || this.rideForm.value.departureDate,
        this.rideForm.value.arrivalSite || this.rideForm.value.departureSite,
        this.rideForm.value.car,
        this.rideForm.value.description,
        this.userService.currentUserValue,
      );

      console.log("Result du form : ", JSON.stringify(ride));

      this.restRide.addRide(ride).subscribe(ride => {
        this.ride = ride;
        this.ridesService.nextRideCreated(ride);
        this.messagesService.openSnackBar(
          'Création du trajet du ' + ride.departureDate + ' au départ de ' + ride.departureSite.siteName + ' enregistrée',
          5000, 'success'
        );

        this.showAndUpdateRide(ride.rideId.toString());

      }, error => {
        this.messagesService.openSnackBar('Erreur serveur', 5000, 'danger', error);
      });
    } catch (error) {
      this.messagesService.openSnackBar('Une erreur est survenue lors de la création du trajet', 5000, 'danger', error);
    }

  }


  /**
   * Update d'un trajet
   * @returns
   * @memberof OneRideComponent
   */
  updateRide(isDeleted: boolean = false) {
    if (this.rideForm.invalid) {
      return;
    }

    try {
      let ride: Ride = this.ride;
      ride.departureDate = this.rideForm.value.departureDate;
      ride.departureSite = this.selectDepartureSite;
      ride.arrivalDate = this.rideForm.value.arrivalDate;
      ride.arrivalSite = this.selectArrivalSite;
      ride.car = this.selectCar;
      ride.description = this.rideForm.value.description;

      if (isDeleted) this.restRide.deleteRide(ride);

      this.restRide.updateRide(ride).subscribe(ride => {
        this.ride = ride;
        this.f.departureSite.setValue(ride.departureSite.siteName);
        if (ride.arrivalSite) this.f.arrivalSite.setValue(ride.arrivalSite.siteName);
        this.f.car.setValue(ride.car.carBrand + " " + ride.car.carModel);
        this.ridesService.nextRideUpdated(ride);

        let msg: string = isDeleted ? 'Suppression' : 'Modification';
        this.messagesService.openSnackBar(msg + ' du trajet du ' + ride.departureDate, 5000, 'success');

        if (isDeleted) this.onClickClose();

      }, error => {
        this.messagesService.openSnackBar('Erreur serveur', 5000, 'danger', error);
      });

    } catch (error) {
      this.messagesService.openSnackBar('Une erreur est survenue lors de la modification du trajet', 5000, 'danger', error);
    }

  }

  /**
   * Gestion du clic sur le bouton fermer
   * Renvoie l'utilisateur à la liste des trajets
   * @readonly
   * @memberof OneRideComponent
   */
  onClickClose() {
    this.router.navigate(['/protected/user/manage-ride/manage-ride']);
  }

  /**
   * Récupération des données des sites
   * @readonly
   * @memberof OneRideComponent
   */
  populateSites() {
    this.restSite.getPlaces()
      .subscribe((sites: Place[]) => {
          this.sites = this.removeDeletedSites(sites);
        },
        (error => {
          throw new Error(error)
        })), catchError((error: any) => {
      this.messagesService.openSnackBar('Une erreur interne est survenue lors de la récupération des sites', 5000, 'danger', error);
      return of([]);
    });
  }

  /**
   * Supprime les sites supprimés (état archivé) de la liste des sites à afficher
   */
  removeDeletedSites(sites: Place[]) {
    if (sites && isArray(sites)) return sites.filter(b => !b.archived);
    return sites;
  }

  onSelectionChangeDepartureSite(site: Place) {
    if (site) {
      this.selectDepartureSite = site;
      this.populateCars(site.siteId);
    }
  }

  onSelectionChangeArrivalSite(site: Place) {
    if (site) this.selectArrivalSite = site;
  }

  /**
   * Récupération des données des voitures
   * @readonly
   * @memberof OneRideComponent
   */
  populateCars(idCar) {
    this.restCar.getCarByPlace(idCar.toString())
      .subscribe((cars: Car[]) => {
          this.cars = this.removeDeletedCars(cars);
        },
        (error => {
          throw new Error(error)
        })), catchError((error: any) => {
      this.messagesService.openSnackBar('Une erreur interne est survenue lors de la récupération des voitures', 5000, 'danger', error);
      return of([]);
    });
  }

  /**
   * Supprime les voitures supprimés (état archivé) de la liste des voitures à afficher
   */
  removeDeletedCars(cars: Car[]) {
    if (cars && isArray(cars)) return cars.filter(c => !c.archived);
    return cars;
  }

  onSelectionChangeCar(car: Car) {
    if (car) this.selectCar = car;
  }
}
