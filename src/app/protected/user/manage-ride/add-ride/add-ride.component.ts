import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Ride} from "../../../../shared/models/entities/ride";
import {RestRideService} from "../../../../core/services/rest/rest-ride.service";
import {Place} from "../../../../shared/models/entities/place";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {RestPlaceService} from "../../../../core/services/rest/rest-place.service";
import {isArray} from "util";
import {MessagesService} from "../../../../core/services/messages/messages.service";
import {Car} from "../../../../shared/models/entities/car";
import {RestCarService} from "../../../../core/services/rest/rest-car.service";

@Component({
  selector: 'app-add-ride',
  templateUrl: './add-ride.component.html',
  styleUrls: ['./add-ride.component.scss']
})
export class AddRideComponent implements OnInit {


  /**
   * Gère les valeurs des champs du formulaire ainsi que leur validité
   * @type {FormGroup}
   * @memberof AddRideComponent
   */
  formRide: FormGroup;

  /**
   * Dernier trajet sauvegardé
   * @type {Ride}
   * @memberof AddRideComponent
   */
  rideSaved: Ride = null;

  /**
   * Message d'erreur du formulaire
   * @type {string}
   * @memberof AddRideComponent
   */
  error: string;

  selectSite: Place;
  sites: Place[];
  selectCar: Car;
  cars: Car[];

  /**
   * Creates an instance of AddRideComponent.
   * Initialise les validateurs des champs du formulaire
   * @param {FormBuilder} formBuilder Form builder
   * @param {RestRideService} restRide - Service exposant les trajets aux autres composants du module
   * @param {RestPlaceService} restSite - Service exposant les sites
   * @param {RestCarService} restCar - Service exposant les voitures
   * @param {MessagesService} messagesService - Service envoyant les message
   * @memberof AddRideComponent
   */
  constructor(
    private formBuilder: FormBuilder,
    private restRide: RestRideService,
    private restSite: RestPlaceService,
    private restCar: RestCarService,
    private messagesService: MessagesService
  ) {
    this.formRide = this.formBuilder.group({
      departureDate: new FormControl('', Validators.required),
      departureSite: new FormControl('', Validators.required),
      car: new FormControl('', Validators.required)
    });
  }

  /**
   * @readonly
   * @memberof AddRideComponent
   */
  get departureSiteFormControl() {
    return this.formRide.get('departureSite')
  }

  /**
   * @readonly
   * @memberof AddRideComponent
   */
  get carFormControl() {
    return this.formRide.get('car')
  }

  /**
   * Récupère les données des lieux au chargement du composant
   * @memberof OneRideComponent
   */
  ngOnInit() {
    this.populateSites();
    this.populateCars();
  }

  /**
   * Validation et enregistrement éventuel des valeurs du formulaire d'ajout d'une voiture
   * @returns
   * @memberof AddRideComponent
   */
  onSubmit() {

    // Stop here if form is invalid.
    if (this.formRide.invalid) {
      return;
    }
    // a remettre


    // let car: Car = new Car(
    //   null,
    //   this.formCar.value.name,
    //   this.formCar.value.matricule,
    //   this.formCar.value.power,
    //   this.formCar.value.places,
    //   false,
    //   this.formCar.value.odometer,
    //   this.formCar.value.insuranceDate,
    //   this.formCar.value.serviceDate,
    //   this.formCar.value.vin,
    //   this.formCar.value.vin,
    //   )
    // ;
    //
    // this.restCar.addCar(car).subscribe(car => {
    //     this.carSaved = car;
    //   },
    //   error => {
    //     console.log('Add car error: ' + JSON.stringify(error));
    //     this.error = 'Une erreur est survenue lors de l\'ajout de la voiture ';
    //   });

  }

  /**
   * Récupération des données des marques
   * @readonly
   * @memberof oneModelFormComponent
   */
  populateSites() {
    this.restSite.getPlaces()
      .subscribe((sites: Place[]) => {
          this.sites = this.removeDeletedSites(sites);
        },
        (error => {
          throw new Error(error)
        })), catchError((error: any) => {
      this.messagesService.openSnackBar('Une erreur interne est survenue lors de la récupération des marques', 5000, 'danger', error);
      return of([]);
    });
  }

  /**
   * Supprime les marques supprimés (état archivé) de la liste des marques à afficher
   */
  removeDeletedSites(sites: Place[]) {
    if (sites && isArray(sites)) return sites.filter(b => !b.archived);
    return sites;
  }

  onSelectionChangeSite(site: Place) {
    if (site) this.selectSite = site;
  }

  /**
   * Récupération des données des marques
   * @readonly
   * @memberof oneModelFormComponent
   */
  populateCars() {
    this.restCar.getCars()
      .subscribe((cars: Car[]) => {
          this.cars = this.removeDeletedCars(cars);
        },
        (error => {
          throw new Error(error)
        })), catchError((error: any) => {
      this.messagesService.openSnackBar('Une erreur interne est survenue lors de la récupération des marques', 5000, 'danger', error);
      return of([]);
    });
  }

  /**
   * Supprime les marques supprimés (état archivé) de la liste des marques à afficher
   */
  removeDeletedCars(cars: Car[]) {
    if (cars && isArray(cars)) return cars.filter(b => !b.archived);
    return cars;
  }

  onSelectionChangeCar(car: Car) {
    if (car) this.selectCar = car;
  }
}
