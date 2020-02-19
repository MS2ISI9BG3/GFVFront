import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Place } from 'src/app/shared/models/entities/place';
import { RestPlaceService } from 'src/app/core/services/rest/rest-place.service';
import { error } from 'protractor';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent {

  /**
   * Gère les valeurs des champs du formulaire ainsi que leur validité
   * @type {FormGroup}
   * @memberof AddPlaceComponent
   */
  formPlace: FormGroup;
  /**
   * Dernier lieu sauvegardé
   * @type {Place}
   * @memberof AddPlaceComponent
   */
  placeSaved: Place = null;
  /**
   * Message d'erreur du formulaire
   * @type {string}
   * @memberof AddPlaceComponent
   */
  error: string;

  /**
   * Creates an instance of AddPlaceComponent.
   * Initialise les validateurs des champs du formulaire
   * @param {FormBuilder} formBuilder Form builder
   * @param {RestPlaceService} restPlace Service exposant les lieux aux autres composants du module
   * @memberof AddPlaceComponent
   */
  constructor(
    private formBuilder: FormBuilder,
    private restPlace: RestPlaceService
  ) {
    this.formPlace = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required)
    });
  }

  /**
   * Récupère le FormControl du champ nom
   * @readonly
   * @memberof AddPlaceComponent
   */
  get nameFormControl() { return this.formPlace.get('name') }
  /**
   * Récupère le FormControl du champ adresse
   * @readonly
   * @memberof AddPlaceComponent
   */
  get addressFormControl() { return this.formPlace.get('address') }
  /**
   * Récupère le FormControl du champ code postal
   * @readonly
   * @memberof AddPlaceComponent
   */
  get zipCodeFormControl() { return this.formPlace.get('zipCode') }
  /**
   * Récupère le FormControl du champ ville
   * @readonly
   * @memberof AddPlaceComponent
   */
  get cityFormControl() { return this.formPlace.get('city') }
  /**
   * Récupère le FormControl du champ téléphone
   * @readonly
   * @memberof AddPlaceComponent
   */
  get phoneFormControl() { return this.formPlace.get('phone') }

  /**
   * Validation et enregistrement éventuel des valeurs du formulaire d'ajout d'un lieu
   * @returns
   * @memberof AddPlaceComponent
   */
  onSubmit() {

    // stop here if form is invalid
    if (this.formPlace.invalid) {
      return;
    }
    
    let place: Place = new Place(
      null,
      this.formPlace.value.name,
      this.formPlace.value.address,
      this.formPlace.value.zipCode,
      this.formPlace.value.city,
      this.formPlace.value.phone,
      false
    );

    this.restPlace.addPlace(place).subscribe(place => {
      this.placeSaved = place;
    },
    error => {
      console.log('Add place error: '+JSON.stringify(error));
      this.error = 'Une erreur est survenue lors de l\'ajout du lieu';
    });

  }
}
