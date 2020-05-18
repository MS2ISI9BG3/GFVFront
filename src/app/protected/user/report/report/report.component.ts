import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RestPlaceService} from "../../../../core/services/rest/rest-place.service";
import {Place} from "../../../../shared/models/entities/place";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  /**
   * Gère les valeurs des champs du formulaire ainsi que leur validité
   * @type {FormGroup}
   * @memberof AddPlaceComponent
   */
  formReport: FormGroup;

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
    this.formReport = this.formBuilder.group({
      description: new FormControl('', Validators.required),
      bloquant: new FormControl(false),
    });
  }

  ngOnInit() {
  }

  get descriptionFormControl() {
    return this.formReport.get('description')
  }

  /**
   * Récupère le FormControl du champ code postal
   * @readonly
   * @memberof AddPlaceComponent
   */


  /**
   * Validation et enregistrement éventuel des valeurs du formulaire d'ajout d'un lieu
   * @returns
   * @memberof AddPlaceComponent
   */
  onSubmit() {

    // stop here if form is invalid
    if (this.formReport.invalid) {
      return;
    }

    //   let place: Place = new Place(
    //   //     null,
    //   //     this.formReport.value.description,
    //   //     this.formReport.value.bloquant,
    //   //   );
    //   //
    //   //   this.restPlace.addPlace(place).subscribe(place => {
    //   //       this.placeSaved = place;
    //   //     },
    //   //     error => {
    //   //       console.log('Add place error: '+JSON.stringify(error));
    //   //       this.error = 'Une erreur est survenue lors de l\'ajout du lieu';
    //   //     });
    //   //
    //   //
  }

}
