import {Component, OnInit} from '@angular/core';
import {Car} from "../../../../shared/models/entities/car";
import {catchError, debounceTime, distinctUntilChanged} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormMode} from "../../../../shared/enums/formMode";
import {ActivatedRoute, Router} from "@angular/router";
import {RestCarService} from "../../../../core/services/rest/rest-car.service";
import {CarsService} from "../../../../core/services/datas/cars.service";
import {MessagesService} from "../../../../core/services/messages/messages.service";
import {MatDialog} from "@angular/material/dialog";
import {of} from "rxjs";
import {ConfirmDialogComponent} from "../../../../shared/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-one-car',
  templateUrl: './one-car.component.html',
  styleUrls: ['./one-car.component.scss']
})
export class OneCarComponent implements OnInit {


  /**
   * Gère les valeurs des champs du formulaire ainsi que leur validité
   * @type {FormGroup}
   * @memberof AddPlaceComponent
   */
  public carForm: FormGroup;
  public car: Car;
  public queryCarId: string = null; // Null: add place, id: show and update place
  public isToUpdate: boolean = false;
  public formMode: FormMode = FormMode.show;

  /**
   * Liste de tous les lieux
   * @type {Car[]}
   * @memberof OneCarComponent
   */
  cars: Car[];


  /**
   * Creates an instance of OneCarComponent.
   * @param formBuilder
   * @param router
   * @param activatedRoute
   * @param restCar
   * @param carsService
   * @param messagesService
   * @param dialog
   * @memberof OneCarComponent
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private restCar: RestCarService,
    private carsService: CarsService,
    private messagesService: MessagesService,
    public dialog: MatDialog
  ) {
    this.carForm = this.formBuilder.group({
      matricule: ['', Validators.required],
      power: ['', Validators.required],
      places: [''],
      odometer: ['', Validators.required],
      insuranceDate: [''],
      serviceValidityDate: [''],
      carBrand: ['', Validators.required],
      carModel: ['', Validators.required],
      carSite: ['', Validators.required],

    });
  }

  /**
   * Récupère les données des lieux au chargement du composant
   * @memberof OneCarComponent
   */
  ngOnInit() {
    this.carForm.reset();
    this.populateQueryParams();
    //Si un id a été passé en paramètre de la route,
    //le composant est en mode affichage d'un site (ou modification si l'utilisateur clic sur le bouton edit)
    //Si pas d'id, mode création d'un nouveau site
    this.queryCarId ? this.showAndUpdateCar(this.queryCarId) : this.createCar();

    // appeler les deux API getBrands
  }

  //
  // ngOnInit() {
  //   this.carService.$carSelected
  //     .subscribe( carSelected =>
  //       this.car = carSelected
  //     );
  //   this.carService.$cars
  //     .subscribe( cars =>
  //       this.cars = cars
  //     );
  // }

  /**
   * Initialisation du mode affichage et mise à jour d'un site
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  showAndUpdateCar(queryCarId: string) {
    this.populateCar(queryCarId);
  }

  /**
   * Initialisation du mode création d'un nouveau site
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  createCar() {
    this.formMode = FormMode.create;
    this.updateDefaultFormValue(this.formMode)
  };

  /**
   * Récupération des données du site pour affichage
   * @readonly
   * @memberof AddFamilyFormComponent
   */

  populateCar(queryCarId: string) {
    this.restCar.getCar(queryCarId)
      .subscribe(car => {
          this.car = car;
          this.updateDefaultFormValue(FormMode.show, car);
        },
        (error => {
          throw new Error(error)
        })), catchError((error: any) => {
      this.messagesService.openSnackBar('Une erreur interne est survenue', 5000, 'danger', error);
      return of([]);
    });
  }


  /**
   * Mise à jour des valeurs du formulaire du site
   * Mode création: champs vides et présence des champs zipCode et city
   * Mode affichage et mise à jour: champs préremplis avec les valeurs du site et
   * absence des champs zipCode et city (inclus dans le champ address)
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  updateDefaultFormValue(formMode: FormMode, car?: Car) {
    console.log('car: ' + JSON.stringify(car));
    if ((formMode == FormMode.show || formMode == FormMode.update) && car) {
      this.f.matricule.setValue(car.matricule);
      this.f.power.setValue(car.power);
      this.f.places.setValue(car.places);
    } else {
      this.f.matricule.setValue('');
      this.f.power.setValue('');
      this.f.places.setValue('');
    }

  }


  /**
   * Récupération de l'id du site passé en paramètre de la route
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  populateQueryParams() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryCarId = params['carId'] ? params['carId'] : null;
      console.log('queryCarId: ' + this.queryCarId);
    });
  }


  // convenience getter for easy access to form fields
  /**
   * Renvoie les controles des champs du formulaire
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  get f() {
    return this.carForm.controls;
  }

  get matriculeFormControl() {
    return this.carForm.get('matricule')
  }

  get powerFormControl() {
    return this.carForm.get('power')
  }

  get odometerFormControl() {
    return this.carForm.get('odometer')
  }

  get placesFormControl() {
    return this.carForm.get('places')
  }

  get insuranceFormControl() {
    return this.carForm.get('insuranceDate')
  }

  get serviceFormControl() {
    return this.carForm.get('serviceValidityDate')
  }

  get brandFormControl() {
    return this.carForm.get('carBrand')
  }

  get modelFormControl() {
    return this.carForm.get('carModel')
  }

  get siteFormControl() {
    return this.carForm.get('carSite')
  }

  /**
   * Gestion du clic sur le bouton d'action
   * Permet de valide la création d'un site,
   * la mise à jour d'un site et son affichage static
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  onClickBtnCar(formMode: FormMode) {
    if (formMode == FormMode.create) {
      this.addCar();
      this.formMode = FormMode.show;
      return
    }

    if (formMode == FormMode.show) {
      this.formMode = FormMode.update;
      return
    }

    if (formMode == FormMode.update) {
      this.updateCar();
      this.formMode = FormMode.show;
      return
    }
  }

  /**
   * Gestion du clic sur le bouton suppression
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  onClickDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "250px",
      data: {
        title: "Confirmer",
        msg: "Le véhicule " + this.car.matricule + " va être supprimé"
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log('dialogResult: ' + dialogResult);
      if (dialogResult) this.updateCar(true);
    });
  }


  /**
   * Validation et enregistrement éventuel des valeurs du formulaire d'ajout d'un lieu
   * @returns
   * @memberof AddPlaceComponent
   */
  addCar() {

    // stop here if form is invalid
    if (this.carForm.invalid) {
      return;
    }

    try {
      let car: Car = new Car(
        null,
        this.carForm.value.matricule,
        this.carForm.value.power,
        this.carForm.value.places,
        null,
        this.carForm.value.odometer,
        this.carForm.value.insuranceDate,
        null,
        this.carForm.value.carBrand,
        this.carForm.value.carModel,
        this.carForm.value.carSite,
        this.carForm.value.serviceValidityDate,
      );

      console.log("result du form : ", car)

      this.restCar.addCar(car).subscribe(car => {

        this.car = car;
        this.carsService.nextCarCreated(car);

        this.messagesService.openSnackBar('Création du véhicule ' + car.matricule + ' enregistrée', 5000, 'success');
        /*this.router.navigate(['/protected/admin/manage-place/one-place'], {
          queryParams: { placeId: place.siteId }
        });*/
        this.showAndUpdateCar(car.carId.toString());

      }, error => {
        this.messagesService.openSnackBar('Erreur serveur', 5000, 'danger', error);
      });

    } catch (error) {
      this.messagesService.openSnackBar('Une erreur est survenue lors de la création du site', 5000, 'danger', error);
    }

  }


  /**
   * Validation et modification des valeurs du formulaire d'ajout d'un lieu
   * @returns
   * @memberof AddPlaceComponent
   */
  updateCar(isDeleted: boolean = false) {

    // stop here if form is invalid
    if (this.carForm.invalid) {
      return;
    }

    try {

      let car = this.car;
      car.matricule = this.carForm.value.name;
      car.power = this.carForm.value.address;
      car.places = this.carForm.value.phone;
      // if ( isDeleted ) car.archived = true;

      this.restCar.updateCar(car).subscribe(car => {

        this.car = car;
        this.carsService.nextCarUpdated(car);

        let msg: string = isDeleted ? 'Suppression' : 'Modification';
        this.messagesService.openSnackBar(msg + ' du vehicule ' + car.matricule + ' enregistrée', 5000, 'success');

        if (isDeleted) this.onClickClose();

      }, error => {
        this.messagesService.openSnackBar('Erreur serveur', 5000, 'danger', error);
      });

    } catch (error) {
      this.messagesService.openSnackBar('Une erreur est survenue lors de la création du véhicule', 5000, 'danger', error);
    }

  }

  /**
   * Gestion du clic sur le bouton fermer
   * Renvoie l'utilisateur à la liste des sites
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  onClickClose() {
    this.router.navigate(['/protected/admin/manage-car/manage-car']);
  }
}
