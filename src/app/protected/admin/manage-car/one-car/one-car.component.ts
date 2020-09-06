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
import {Brand} from "../../../../shared/models/entities/brand";
import {RestBrandService} from "../../../../core/services/rest/rest-brand.service";
import {isArray} from "util";
import {Model} from "../../../../shared/models/entities/model";
import {RestModelService} from "../../../../core/services/rest/rest-model.service";
import {Place} from "../../../../shared/models/entities/place";
import {RestPlaceService} from "../../../../core/services/rest/rest-place.service";

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
  public brands: Brand[];
  public selectBrand: Brand;
  public models: Model[];
  public selectModel: Model;
  public sites: Place[];
  public selectSite: Place;
  public formMode: FormMode = FormMode.show;
  public compareWithFn = (currentBrand: Brand) => {
    // Mise à jour de la marque associé au modèle dans la liste déroulante des modèles
    if (!this.car) return false;
    return currentBrand.brandId == this.car.carBrand.brandId ? true : false;
  };

  public compareWithFnModel = (currentModel: Model) => {
    // Mise à jour de la marque associé au modèle dans la liste déroulante des modèles
    if (!this.car) return false;
    return currentModel.modelId == this.car.carModel.modelId ? true : false;
  };

  public compareWithFnSite = (currenSite: Place) => {
    // Mise à jour de la marque associé au modèle dans la liste déroulante des modèles
    if (!this.car) return false;
    return currenSite.siteId == this.car.carSite.siteId ? true : false;
  };


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
    public dialog: MatDialog,
    private restBrand: RestBrandService,
    private restModel: RestModelService,
    private restSite: RestPlaceService
  ) {
    this.carForm = this.formBuilder.group({
      matricule: ['', Validators.pattern('[A-Za-z]{2}-[0-9]{3}-[A-Za-z]{2}')],
      power: ['', Validators.required],
      vin: ['', Validators.pattern('[A-Za-z0-9]{17}')],
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
    //Récupération de toutes les marques de voiture
    this.populateBrands();
    this.populateSites();
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
          this.populateModels(car.carBrand.brandId)
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
      this.f.odometer.setValue(car.odometer);
      this.f.vin.setValue(car.vin);
      if (car.carBrand) this.selectBrand = car.carBrand;
      this.f.carBrand.setValue(car.carBrand.brandName);
      if (car.carModel) this.selectModel = car.carModel;
      this.f.carModel.setValue(car.carModel.modelName);
      if (car.carSite) this.selectSite = car.carSite;
      this.f.carSite.setValue(car.carSite.siteName);
      this.f.insuranceDate.setValue(car.insuranceDate);
      this.f.serviceValidityDate.setValue(car.serviceValidityDate);
    } else {
      this.f.matricule.setValue('');
      this.f.power.setValue('');
      this.f.places.setValue('');
      this.f.odometer.setValue('');
      this.f.vin.setValue('');
      this.f.carBrand.setValue('');
      this.f.carModel.setValue('');
      this.f.carSite.setValue('');
      this.f.insuranceDate.setValue('');
      this.f.serviceValidityDate.setValue('');
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

  get vinFormControl() {
    return this.carForm.get('vin')
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
        Number(this.carForm.value.power),
        Number(this.carForm.value.places),
        Number(this.carForm.value.odometer),
        this.carForm.value.insuranceDate,
        this.carForm.value.vin,
        this.carForm.value.carBrand,
        this.carForm.value.carModel,
        this.carForm.value.carSite,
        this.carForm.value.serviceValidityDate,
        false
      );

      console.log("result du form : ", car)

      this.restCar.addCar(car).subscribe(car => {

        this.car = car;
        this.carsService.nextCarCreated(car);

        this.messagesService.openSnackBar('Création du véhicule ' + car.matricule + ' enregistrée', 5000, 'success');

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
    if ( isDeleted ){
      try {
        let car: Car = this.car;
        this.restCar.deleteCar(car).subscribe(car => {

          this.car = car;
          this.f.carBrand.setValue(car.carBrand.brandName);
          this.f.carModel.setValue(car.carModel.modelName);
          this.f.carSite.setValue(car.carSite.siteName);
          this.carsService.nextCarUpdated(car);

          let msg: string = 'Suppression'
          this.messagesService.openSnackBar(msg + ' du vehicule ' + car.matricule + ' enregistrée', 5000, 'success');
          this.onClickClose();

        }, error => {
          this.messagesService.openSnackBar('Erreur serveur', 5000, 'danger', error);
        });

      } catch (error) {
        this.messagesService.openSnackBar('Une erreur est survenue lors de la supression du véhicule', 5000, 'danger', error);
      }
      return
    }

    try {
      let car: Car = this.car;
      car.matricule = this.carForm.value.matricule;
      car.power = this.carForm.value.power;
      car.places = this.carForm.value.places;
      car.odometer = this.carForm.value.odometer;

      car.insuranceDate = this.carForm.value.insuranceDate;
      car.vin = this.carForm.value.vin;
      car.carBrand = this.selectBrand;
      car.carModel = this.selectModel;
      car.carSite = this.selectSite;
      car.serviceValidityDate = this.carForm.value.serviceValidityDate;

      this.restCar.updateCar(car).subscribe(car => {

        this.car = car;
        this.f.carBrand.setValue(car.carBrand.brandName);
        this.f.carModel.setValue(car.carModel.modelName);
        this.f.carSite.setValue(car.carSite.siteName);
        this.carsService.nextCarUpdated(car);

        let msg: string = 'Modification';
        this.messagesService.openSnackBar(msg + ' du vehicule ' + car.matricule + ' enregistrée', 5000, 'success');


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

  /**
   * Récupération des données des marques
   * @readonly
   * @memberof oneModelFormComponent
   */
  populateBrands() {
    this.restBrand.getBrands()
      .subscribe((brands: Brand[]) => {
          this.brands = this.removeDeletedBrands(brands);
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
  removeDeletedBrands(brands: Brand[]) {
    if (brands && isArray(brands)) return brands.filter(b => !b.archived);
    return brands;
  }

  onSelectionChangeBrand(brand: Brand) {
    if (brand) this.selectBrand = brand;
    //Récupération de toutes les marques de voiture
    if (brand) this.populateModels(brand.brandId);
  }

  /**
   * Récupération des données des marques
   * @readonly
   * @memberof oneModelFormComponent
   */
  populateModels(idBrand) {
    this.restModel.getModelByBrand(idBrand.toString())
      .subscribe((models: Model[]) => {
          this.models = this.removeDeletedModels(models);
        },
        (error => {
          throw new Error(error)
        })), catchError((error: any) => {
      this.messagesService.openSnackBar('Une erreur interne est survenue lors de la récupération des models', 5000, 'danger', error);
      return of([]);
    });
  }

  /**
   * Supprime les marques supprimés (état archivé) de la liste des marques à afficher
   */
  removeDeletedModels(models: Model[]) {
    if (models && isArray(models)) return models.filter(b => !b.archived);
    return models;
  }

  onSelectionChangeModel(model: Model) {
    if (model) this.selectModel = model;

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


}
