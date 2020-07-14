import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/shared/models/entities/place';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RestPlaceService } from 'src/app/core/services/rest/rest-place.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlacesService } from 'src/app/core/services/datas/places.service';
import { MessagesService } from 'src/app/core/services/messages/messages.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormMode } from 'src/app/shared/enums/formMode';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-one-place',
  templateUrl: './one-place.component.html',
  styleUrls: ['./one-place.component.scss']
})
export class OnePlaceComponent implements OnInit {

  /**
   * Gère les valeurs des champs du formulaire ainsi que leur validité
   * @type {FormGroup}
   * @memberof AddPlaceComponent
   */
  public placeForm: FormGroup;
  public place: Place;
  public queryPlaceId: string = null; // Null: add place, id: show and update place
  public isToUpdate: boolean = false;
  public formMode: FormMode = FormMode.show;

  /**
   * Creates an instance of AddPlaceComponent.
   * Initialise les validateurs des champs du formulaire
   * @param {FormBuilder} formBuilder Form builder
   * @param {RestPlaceService} restPlace Service exposant les lieux aux autres composants du module
   * @memberof AddPlaceComponent
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private restPlace: RestPlaceService,
    private placesService: PlacesService,
    private messagesService: MessagesService,
    public dialog: MatDialog
  ) {
    this.placeForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  /**
   * Actions à l'initialisation du formulaire
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  ngOnInit() {
    this.placeForm.reset();
    this.populateQueryParams();
    //Si un id a été passé en paramètre de la route,
    //le composant est en mode affichage d'un site (ou modification si l'utilisateur clic sur le bouton edit)
    //Si pas d'id, mode création d'un nouveau site
    this.queryPlaceId ? this.showAndUpdatePlace(this.queryPlaceId) : this.createPlace();
  }

  /**
   * Initialisation du mode affichage et mise à jour d'un site
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  showAndUpdatePlace(queryPlaceId: string) {
    this.populatePlace(queryPlaceId);
  }

  /**
   * Initialisation du mode création d'un nouveau site
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  createPlace() {
    this.formMode = FormMode.create;
    this.updateDefaultFormValue(this.formMode)
  };

  /**
   * Récupération des données du site pour affichage
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  populatePlace(queryPlaceId: string) {
    this.restPlace.getPlace(queryPlaceId)
      .subscribe( place => {
        this.place = place;
        this.updateDefaultFormValue(FormMode.show, place);
      },
      ( error => {
        throw new Error(error)
      })), catchError( (error: any) => {
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
  updateDefaultFormValue(formMode: FormMode, place?: Place) {
    console.log('place: '+JSON.stringify(place));
    if ( (formMode == FormMode.show || formMode == FormMode.update) && place ) {
      this.f.name.setValue(place.siteName);
      this.f.address.setValue(place.siteAddress);
      this.f.phone.setValue(place.sitePhoneNumber);
      // Suppression des validators des input zipCode et city pour 
      // évter l'apparition de messages d'erreurs lors de la modification
      // Ils n'existent pas dans le backend. Ils ont été ajoutés à l'adresse.
      this.f.zipCode.clearValidators();
      this.f.zipCode.updateValueAndValidity();
      this.f.city.clearValidators();
      this.f.city.updateValueAndValidity();
    } else {
      this.f.name.setValue('');
      this.f.address.setValue('');
      this.f.phone.setValue('');
      // zipCode et city sont requis lors de la création d'un site
      this.f.zipCode.setValidators(Validators.required);
      this.f.zipCode.updateValueAndValidity();
      this.f.city.setValidators(Validators.required);
      this.f.city.updateValueAndValidity();
    }
    
  }

  /**
   * Récupération de l'id du site passé en paramètre de la route
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  populateQueryParams() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryPlaceId = params['placeId'] ? params['placeId'] : null;
      console.log('queryPlaceId: '+this.queryPlaceId);
    });
  }

  // convenience getter for easy access to form fields
  /**
   * Renvoie les controles des champs du formulaire
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  get f() { return this.placeForm.controls; }

  get nameFormControl() { return this.placeForm.get('name') }
  get addressFormControl() { return this.placeForm.get('address') }
  get zipCodeFormControl() { return this.placeForm.get('zipCode') }
  get cityFormControl() { return this.placeForm.get('city') }
  get phoneFormControl() { return this.placeForm.get('phone') }

  /**
   * Gestion du clic sur le bouton d'action
   * Permet de valide la création d'un site,
   * la mise à jour d'un site et son affichage static
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  onClickBtnPlace(formMode: FormMode) {
    if (formMode == FormMode.create) { this.addPlace(); this.formMode = FormMode.show; return };
    if (formMode == FormMode.show) { this.formMode = FormMode.update; return };
    if (formMode == FormMode.update) { this.updatePlace(); this.formMode = FormMode.show; return }
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
          msg: "Le site "+this.place.siteName+" va être supprimé"}
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log('dialogResult: '+dialogResult);
      if ( dialogResult ) this.updatePlace(true);
   });
  }

  /**
   * Validation et enregistrement éventuel des valeurs du formulaire d'ajout d'un lieu
   * @returns
   * @memberof AddPlaceComponent
   */
  addPlace() {

    // stop here if form is invalid
    if (this.placeForm.invalid) {
      return;
    }
    
    try {
      
      let place: Place = new Place(
        null,
        this.placeForm.value.name,
        this.placeForm.value.address+" "+this.placeForm.value.zipCode+" "+this.placeForm.value.city,
        this.placeForm.value.phone,
        false
      );
  
      this.restPlace.addPlace(place).subscribe(place => {
        
        this.place = place;
        this.placesService.nextPlaceCreated(place);
        
        this.messagesService.openSnackBar('Création du site '+place.siteName+' enregistrée', 5000, 'success');
        /*this.router.navigate(['/protected/admin/manage-place/one-place'], {
          queryParams: { placeId: place.siteId }
        });*/
        this.showAndUpdatePlace(place.siteId.toString());
  
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
  updatePlace(isDeleted: boolean = false) {

    // stop here if form is invalid
    if (this.placeForm.invalid) {
      return;
    }
    
    try {
      
      let place = this.place;
      place.siteName = this.placeForm.value.name;
      place.siteAddress = this.placeForm.value.address;
      place.sitePhoneNumber = this.placeForm.value.phone;
      if ( isDeleted ) place.archived = true;
  
      this.restPlace.updatePlace(place).subscribe(place => {
        
        this.place = place;
        this.placesService.nextPlaceUpdated(place);
  
        let msg: string = isDeleted ? 'Suppression' : 'Modification';
        this.messagesService.openSnackBar(msg+' du site '+place.siteName+' enregistrée', 5000, 'success');

        if ( isDeleted ) this.onClickClose();
  
      }, error => {
        this.messagesService.openSnackBar('Erreur serveur', 5000, 'danger', error);
      });

    } catch (error) {
      this.messagesService.openSnackBar('Une erreur est survenue lors de la création du site', 5000, 'danger', error);
    }

  }

  /**
   * Gestion du clic sur le bouton fermer
   * Renvoie l'utilisateur à la liste des sites
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  onClickClose() {
    this.router.navigate(['/protected/admin/manage-place/manage-place']);
  }
  
}
