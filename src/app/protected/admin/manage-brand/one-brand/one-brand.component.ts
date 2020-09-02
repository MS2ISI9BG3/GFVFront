import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Brand } from 'src/app/shared/models/entities/brand';
import { FormMode } from 'src/app/shared/enums/formMode';
import { Router, ActivatedRoute } from '@angular/router';
import { RestBrandService } from 'src/app/core/services/rest/rest-brand.service';
import { BrandsService } from 'src/app/core/services/datas/brands.service';
import { MessagesService } from 'src/app/core/services/messages/messages.service';
import { MatDialog } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-one-brand',
  templateUrl: './one-brand.component.html',
  styleUrls: ['./one-brand.component.scss']
})
export class OneBrandComponent implements OnInit {

  /**
   * Gère les valeurs des champs du formulaire ainsi que leur validité
   * @type {FormGroup}
   * @memberof AddBrandComponent
   */
  public brandForm: FormGroup;
  public brand: Brand;
  public queryBrandId: string = null; // Null: add brand, id: show and update brand
  public isToUpdate: boolean = false;
  public formMode: FormMode = FormMode.show;

  /**
   * Creates an instance of AddBrandComponent.
   * Initialise les validateurs des champs du formulaire
   * @param {FormBuilder} formBuilder Form builder
   * @param {RestBrandService} restBrand Service exposant les lieux aux autres composants du module
   * @memberof AddBrandComponent
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private restBrand: RestBrandService,
    private brandsService: BrandsService,
    private messagesService: MessagesService,
    public dialog: MatDialog
  ) {
    this.brandForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  /**
   * Actions à l'initialisation du formulaire
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  ngOnInit() {
    this.brandForm.reset();
    this.populateQueryParams();
    //Si un id a été passé en paramètre de la route,
    //le composant est en mode affichage d'une marque (ou modification si l'utilisateur clic sur le bouton edit)
    //Si pas d'id, mode création d'une nouvelle marque
    this.queryBrandId ? this.showAndUpdateBrand(this.queryBrandId) : this.createBrand();
  }

  /**
   * Initialisation du mode affichage et mise à jour d'une marque
   * @readonly
   * @memberof OneBrandFormComponent
   */
  showAndUpdateBrand(queryBrandId: string) {
    this.populateBrand(queryBrandId);
  }

  /**
   * Initialisation du mode création d'une nouvelle marque
   * @readonly
   * @memberof OneBrandFormComponent
   */
  createBrand() {
    this.formMode = FormMode.create;
    this.updateDefaultFormValue(this.formMode)
  };

  /**
   * Récupération des données du site pour affichage
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  populateBrand(queryBrandId: string) {
    this.restBrand.getBrand(queryBrandId)
      .subscribe( brand => {
        this.brand = brand;
        this.updateDefaultFormValue(FormMode.show, brand);
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
  updateDefaultFormValue(formMode: FormMode, brand?: Brand) {

    if ( (formMode == FormMode.show || formMode == FormMode.update) && brand ) {
      this.f.name.setValue(brand.brandName);
    } else {
      this.f.name.setValue('');
    }
    
  }

  /**
   * Récupération de l'id d'une marque passée en paramètre de la route
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  populateQueryParams() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryBrandId = params['brandId'] ? params['brandId'] : null;
      console.log('queryBrandId: '+this.queryBrandId);
    });
  }

  // convenience getter for easy access to form fields
  /**
   * Renvoie les controles des champs du formulaire
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  get f() { return this.brandForm.controls; }

  get nameFormControl() { return this.brandForm.get('name') }

  /**
   * Gestion du clic sur le bouton d'action
   * Permet de valide la création d'une marque,
   * la mise à jour d'une marque et son affichage static
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  onClickBtnBrand(formMode: FormMode) {
    if (formMode == FormMode.create) { this.addBrand(); this.formMode = FormMode.show; return };
    if (formMode == FormMode.show) { this.formMode = FormMode.update; return };
    if (formMode == FormMode.update) { this.updateBrand(); this.formMode = FormMode.show; return }
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
          msg: "La marque "+this.brand.brandName+" va être supprimée"}
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log('dialogResult: '+dialogResult);
      if ( dialogResult ) this.updateBrand(true);
   });
  }

  /**
   * Validation et enregistrement éventuel des valeurs du formulaire d'ajout d'une marque
   * @returns
   * @memberof AddBrandComponent
   */
  addBrand() {

    // stop here if form is invalid
    if (this.brandForm.invalid) {
      return;
    }
    
    try {
      
      let brand: Brand = new Brand(
        null,
        this.brandForm.value.name,
        false
      );
  
      this.restBrand.addBrand(brand).subscribe(brand => {
        
        this.brand = brand;
        this.brandsService.nextBrandCreated(brand);
        
        this.messagesService.openSnackBar('Création de la marque '+brand.brandName+' enregistrée', 5000, 'success');
        /*this.router.navigate(['/protected/admin/manage-place/one-place'], {
          queryParams: { placeId: place.siteId }
        });*/
        this.showAndUpdateBrand(brand.brandId.toString());
  
      }, error => {
        this.messagesService.openSnackBar('Erreur serveur', 5000, 'danger', error);
      });

    } catch (error) {
      this.messagesService.openSnackBar('Une erreur est survenue lors de la création de la marque', 5000, 'danger', error);
    }

  }

  /**
   * Validation et modification des valeurs du formulaire d'ajout d'une marque
   * @returns
   * @memberof AddBrandComponent
   */
  updateBrand(isDeleted: boolean = false) {

    // stop here if form is invalid
    if (this.brandForm.invalid) {
      return;
    }
    
    try {
      
      let brand: Brand = this.brand;
      brand.brandName = this.brandForm.value.name;
      if ( isDeleted ) brand.archived = true;
  
      this.restBrand.updateBrand(brand).subscribe(brand => {
        
        this.brand = brand;
        this.brandsService.nextBrandUpdated(brand);
  
        let msg: string = isDeleted ? 'Suppression' : 'Modification';
        this.messagesService.openSnackBar(msg+' de la marque '+brand.brandName+' enregistrée', 5000, 'success');

        if ( isDeleted ) this.onClickClose();
  
      }, error => {
        this.messagesService.openSnackBar('Erreur serveur', 5000, 'danger', error);
      });

    } catch (error) {
      this.messagesService.openSnackBar('Une erreur est survenue lors de la création de la marque', 5000, 'danger', error);
    }

  }

  /**
   * Gestion du clic sur le bouton fermer
   * Renvoie l'utilisateur à la liste des sites
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  onClickClose() {
    this.router.navigate(['/protected/admin/manage-brand/manage-brand']);
  }
  
}
