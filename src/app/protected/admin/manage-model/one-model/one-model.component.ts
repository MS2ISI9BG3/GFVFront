import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Model } from 'src/app/shared/models/entities/model';
import { FormMode } from 'src/app/shared/enums/formMode';
import { Router, ActivatedRoute } from '@angular/router';
import { RestModelService } from 'src/app/core/services/rest/rest-model.service';
import { ModelsService } from 'src/app/core/services/datas/models.service';
import { MessagesService } from 'src/app/core/services/messages/messages.service';
import { MatDialog } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Brand } from 'src/app/shared/models/entities/brand';
import { RestBrandService } from 'src/app/core/services/rest/rest-brand.service';
import { isArray } from 'util';

@Component({
  selector: 'app-one-model',
  templateUrl: './one-model.component.html',
  styleUrls: ['./one-model.component.scss']
})
export class OneModelComponent implements OnInit {
/**
   * Gère les valeurs des champs du formulaire ainsi que leur validité
   * @type {FormGroup}
   * @memberof AddBrandComponent
   */
  public modelForm: FormGroup;
  public model: Model;
  public brands: Brand[];
  public selectBrand: Brand;
  public queryModelId: string = null; // Null: add model, id: show and update model
  public isToUpdate: boolean = false;
  public formMode: FormMode = FormMode.show;
  public compareWithFn = (currentBrand: Brand) => {
    // Mise à jour de la marque associé au modèle dans la liste déroulante des modèles
    if (!this.model) return false;
    return currentBrand.brandId == this.model.carBrand.brandId ? true : false;
  };

  /**
   * Creates an instance of AddBrandComponent.
   * Initialise les validateurs des champs du formulaire
   * @param {FormBuilder} formBuilder Form builder
   * @param {RestBrandService} restModel Service exposant les lieux aux autres composants du module
   * @memberof AddBrandComponent
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private restModel: RestModelService,
    private restBrand: RestBrandService,
    private modelsService: ModelsService,
    private messagesService: MessagesService,
    public dialog: MatDialog
  ) {
    this.modelForm = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required]
    });
  }

  /**
   * Actions à l'initialisation du formulaire
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  ngOnInit() {
    this.modelForm.reset();
    this.populateQueryParams();
    //Récupération de toutes les marques de voiture
    this.populateBrands();
    //Si un id a été passé en paramètre de la route,
    //le composant est en mode affichage d'une marque (ou modification si l'utilisateur clic sur le bouton edit)
    //Si pas d'id, mode création d'une nouvelle marque
    this.queryModelId ? this.showAndUpdateModel(this.queryModelId) : this.createModel();
  }

  /**
   * Initialisation du mode affichage et mise à jour d'une marque
   * @readonly
   * @memberof OneBrandFormComponent
   */
  showAndUpdateModel(queryModelId: string) {
    this.populateModel(queryModelId);
  }

  /**
   * Initialisation du mode création d'une nouvelle marque
   * @readonly
   * @memberof OneBrandFormComponent
   */
  createModel() {
    this.formMode = FormMode.create;
    this.updateDefaultFormValue(this.formMode)
  };

  /**
   * Récupération des données du modèle pour affichage
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  populateModel(queryModelId: string) {
    this.restModel.getModel(queryModelId)
      .subscribe( model => {
        this.model = model;
        this.updateDefaultFormValue(FormMode.show, model);
      },
      ( error => {
        throw new Error(error)
      })), catchError( (error: any) => {
        this.messagesService.openSnackBar('Une erreur interne est survenue', 5000, 'danger', error);
        return of([]);
      });
  }

  /**
   * Récupération des données des marques
   * @readonly
   * @memberof oneModelFormComponent
   */
  populateBrands() {
    this.restBrand.getBrands()
      .subscribe( (brands: Brand[]) => {
        this.brands = this.removeDeletedModels(brands);
      },
      ( error => {
        throw new Error(error)
      })), catchError( (error: any) => {
        this.messagesService.openSnackBar('Une erreur interne est survenue lors de la récupération des marques', 5000, 'danger', error);
        return of([]);
      });
  }

  /**
   * Supprime les marques supprimés (état archivé) de la liste des marques à afficher
   */
  removeDeletedModels(brands: Brand[]) {
    if ( brands && isArray(brands) ) return brands.filter( b => !b.archived );
    return brands;
  }

  /**
   * Mise à jour des valeurs du formulaire du site
   * Mode création: champs vides et présence des champs zipCode et city
   * Mode affichage et mise à jour: champs préremplis avec les valeurs du site et
   * absence des champs zipCode et city (inclus dans le champ address)
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  updateDefaultFormValue(formMode: FormMode, model?: Model) {

    if ( (formMode == FormMode.show || formMode == FormMode.update) && model ) {
      this.f.name.setValue(model.modelName);
      if (model.carBrand) this.selectBrand = model.carBrand;
      this.f.brand.setValue(model.carBrand.brandName);
    } else {
      this.f.name.setValue('');
      this.f.brand.setValue('');
    }
    
  }

  /**
   * Récupération de l'id d'une marque passée en paramètre de la route
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  populateQueryParams() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryModelId = params['modelId'] ? params['modelId'] : null;
      console.log('queryModelId: '+this.queryModelId);
    });
  }

  // convenience getter for easy access to form fields
  /**
   * Renvoie les controles des champs du formulaire
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  get f() { return this.modelForm.controls; }

  get nameFormControl() { return this.modelForm.get('name') }
  get brandFormControl() { return this.modelForm.get('brand') }

  /**
   * Gestion du clic sur le bouton d'action
   * Permet de valide la création d'une marque,
   * la mise à jour d'une marque et son affichage static
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  onClickBtnModel(formMode: FormMode) {
    if (formMode == FormMode.create) { this.addModel(); this.formMode = FormMode.show; return };
    if (formMode == FormMode.show) { this.formMode = FormMode.update; return };
    if (formMode == FormMode.update) { this.updateModel(); this.formMode = FormMode.show; return }
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
          msg: "Le modèle "+this.model.modelName+" va être supprimé"}
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log('dialogResult: '+dialogResult);
      if ( dialogResult ) this.updateModel(true);
   });
  }

  onSelectionChangeBrand(brand: Brand) {
    if (brand) this.selectBrand = brand;
  }

  /**
   * Validation et enregistrement éventuel des valeurs du formulaire d'ajout d'une marque
   * @returns
   * @memberof AddBrandComponent
   */
  addModel() {

    // stop here if form is invalid
    if (this.modelForm.invalid) {
      return;
    }
    
    try {
      
      let model: Model = new Model(
        null,
        this.modelForm.value.name,
        this.modelForm.value.brand,//TODO
        false
      );
  
      this.restModel.addModel(model).subscribe(model => {
        
        this.model = model;
        this.modelsService.nextModelCreated(model);
        
        this.messagesService.openSnackBar('Création du modèle '+model.modelName+' enregistré', 5000, 'success');
        /*this.router.navigate(['/protected/admin/manage-place/one-place'], {
          queryParams: { placeId: place.siteId }
        });*/
        this.showAndUpdateModel(model.modelId.toString());
  
      }, error => {
        this.messagesService.openSnackBar('Erreur serveur', 5000, 'danger', error);
      });

    } catch (error) {
      this.messagesService.openSnackBar('Une erreur est survenue lors de la création du modèle', 5000, 'danger', error);
    }

  }

  /**
   * Validation et modification des valeurs du formulaire d'ajout d'une marque
   * @returns
   * @memberof AddBrandComponent
   */
  updateModel(isDeleted: boolean = false) {

    // stop here if form is invalid
    if (this.modelForm.invalid) {
      return;
    }

    try {
      
      let model: Model = this.model;
      model.modelName = this.modelForm.value.name;
      model.carBrand = this.selectBrand; //this.modelForm.value.brand;
      if ( isDeleted ) model.archived = true;
  
      this.restModel.updateModel(model).subscribe(model => {
        
        this.model = model;
        this.f.brand.setValue(model.carBrand.brandName);
        this.modelsService.nextModelUpdated(model);
  
        let msg: string = isDeleted ? 'Suppression' : 'Modification';
        this.messagesService.openSnackBar(msg+' du modèle '+model.modelName+' enregistré', 5000, 'success');

        if ( isDeleted ) this.onClickClose();
  
      }, error => {
        this.messagesService.openSnackBar('Erreur serveur', 5000, 'danger', error);
      });

    } catch (error) {
      this.messagesService.openSnackBar('Une erreur est survenue lors de la création du modèle', 5000, 'danger', error);
    }

  }

  onChangeBrand(brand: Brand) {
    console.log('SELECTED BRAND: '+brand.brandName);
  }

  /**
   * Gestion du clic sur le bouton fermer
   * Renvoie l'utilisateur à la liste des sites
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  onClickClose() {
    this.router.navigate(['/protected/admin/manage-model/manage-model']);
  }

}
