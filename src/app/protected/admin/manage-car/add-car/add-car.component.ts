import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Car} from "../../../../shared/models/entities/car";
import {RestCarService} from "../../../../core/services/rest/rest-car.service";

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent implements OnInit {


  /**
   * Gère les valeurs des champs du formulaire ainsi que leur validité
   * @type {FormGroup}
   * @memberof AddCarComponent
   */
  formCar: FormGroup;
  /**
   * Dernier lieu sauvegardé
   * @type {Car}
   * @memberof AddCarComponent
   */
  carSaved: Car = null;
  /**
   * Message d'erreur du formulaire
   * @type {string}
   * @memberof AddCarComponent
   */
  error: string;

  /**
   * Creates an instance of AddCarComponent.
   * Initialise les validateurs des champs du formulaire
   * @param {FormBuilder} formBuilder Form builder
   * @param {RestCarService} restCar Service exposant les lieux aux autres composants du module
   * @memberof AddCarComponent
   */
  constructor(
    private formBuilder: FormBuilder,
    private restCar: RestCarService
  ) {
    this.formCar = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      matricule: new FormControl('', Validators.required),
      power: new FormControl('', Validators.required),
      places: new FormControl('', Validators.required),
      odometer: new FormControl('', Validators.required),
      insuranceDate: new FormControl('', Validators.required),
      serviceDate: new FormControl('', Validators.required)
    });

  }

  /**
   * Récupère le FormControl du champ nom
   * @readonly
   * @memberof AddCarComponent
   */
  get nameFormControl() {
    return this.formCar.get('name')
  }

  /**
   * @readonly
   * @memberof AddCarComponent
   */
  get matriculeFormControl() {
    return this.formCar.get('matricule')
  }

  /**

   * @readonly
   * @memberof AddCarComponent
   */
  get powerFormControl() {
    return this.formCar.get('power')
  }

  /**
   * @readonly
   * @memberof AddCarComponent
   */
  get placesFormControl() {
    return this.formCar.get('places')
  }

  /**
   * @readonly
   * @memberof AddCarComponent
   */
  get odometerFormControl() {
    return this.formCar.get('odometer')
  }

  /**
   * @readonly
   * @memberof AddCarComponent
   */
  get insuranceDateFormControl() {
    return this.formCar.get('insuranceDate')
  }

  /**
   * @readonly
   * @memberof AddCarComponent
   */
  get serviceDateFormControl() {
    return this.formCar.get('serviceDate')
  }

  /**
   * Validation et enregistrement éventuel des valeurs du formulaire d'ajout d'une voiture
   * @returns
   * @memberof AddCarComponent
   */
  onSubmit() {

    // stop here if form is invalid
    if (this.formCar.invalid) {
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

  ngOnInit(): void {
  }

}
