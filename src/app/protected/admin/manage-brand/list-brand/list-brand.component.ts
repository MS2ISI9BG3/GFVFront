import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/shared/models/entities/brand';
import { RestBrandService } from 'src/app/core/services/rest/rest-brand.service';
import { Router } from '@angular/router';
import { BrandsService } from 'src/app/core/services/datas/brands.service';
import { MessagesService } from 'src/app/core/services/messages/messages.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { isArray, isString } from 'util';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-list-brand',
  templateUrl: './list-brand.component.html',
  styleUrls: ['./list-brand.component.scss']
})
export class ListBrandComponent implements OnInit {

  /**
   * Tableau contenant toutes les marques
   * @type {Brand[]}
   * @memberof ListBrandComponent
   */
  brands: Brand[] = [];
  /**
   * Tableau contenant toutes les marques après application des filtres pour affichage
   * @type {Brand[]}
   * @memberof ListBrandComponent
   */
  brandsFiltered: Brand[] = [];

  public isMobile: boolean = true;

  /**
   * Creates an instance of ListBrandComponent.
   * @param {RestBrandService} restBrand
   * @param {Router} router
   * @param {BrandsService} brandsService
   * @param {MessagesService} messageService
   * @memberof ListBrandComponent
   */
  constructor(
    private restBrand: RestBrandService,
    private router: Router,
    private brandsService: BrandsService,
    private messageService: MessagesService,
    private deviceDetector: DeviceDetectorService
  ) { }

  /**
   * Initialisation de la liste des lieux
   * @memberof ListBrandComponent
   */
  ngOnInit() {
    this.isMobile = !this.deviceDetector.isDesktop();
    this.populateBrandsFromApi();
  }

  /**
   * Récupération des marques à afficher à partir de l'API
   * @memberof ListBrandComponent
   */
  populateBrandsFromApi() {
    this.restBrand.getBrands()
    .subscribe(brands => {

      this.brands = brands;
      this.brandsFiltered = this.removeDeletedBrands(brands);
      this.brandsService.nextBrands(brands);
      this.populateBrandsFromService();

    },error => {
      throw new Error(error)
    }), catchError( error => {
      this.messageService.openSnackBar('Erreur serveur', 5000, 'danger', error);
      return of([]);
    });
  }

  /**
   * Mise à jour de la liste des marques à afficher
   * @memberof ListBrandComponent
   */
  populateBrandsFromService() {
    this.brandsService.brands$.subscribe( brands => {
      this.brands = brands;
      this.brandsFiltered = this.removeDeletedBrands(brands);
    });
  }

  /**
   * Supprime les marques supprimés (état archivé) de la liste des marques à afficher
   * @param {Brand[]} brands
   * @returns
   * @memberof ListBrandComponent
   */
  removeDeletedBrands(brands: Brand[]) {
    if ( brands && isArray(brands) ) return brands.filter( b => !b.archived );
    return brands;
  }

  /**
   * Gestion de l'évenement ajout d'une entrée dans la zone de recherche
   * Filtre la liste des marques (minium 3 caractères à saisir dans le champ)
   * @param {*} event
   * @memberof ListBrandComponent
   */
  onInputSearch(event: any) {

    try {
      
      if ( !isString(event.toString()) ) throw new Error();

      const inputValue: string = event.trim().toLocaleLowerCase();

      if ( inputValue.length >= 3 ) {
        this.brandsFiltered = this.removeDeletedBrands(this.brands).filter( 
          brand => brand.brandName.toLocaleLowerCase().search(inputValue) > -1
        );
      } else {
        throw new Error();
      }

    } catch {
      this.brandsFiltered = this.removeDeletedBrands(this.brands);
    }

  }

  /**
   * Gestion de l'événèment clic sur une marque de la liste des marques
   * @param {Brand} brand
   * @memberof ListBrandComponent
   */
  onClickBrand(brand: Brand) {
    //L'id de la marque est passé en paramètre,
    //la page affichée sera donc en mode consultation d'une marque
    this.router.navigate(['/protected/admin/manage-brand/one-brand'], {
      queryParams: { brandId: brand.brandId }
   });
  }

  /**
   * Gestion de l'événement clic sur la boutton d'ajout d'une marque
   * @memberof ListBrandComponent
   */
  onClickAddBrand() {
    //L'id de la marque n'est pas passé en paramètre,
    //la page affichée sera donc en mode création d'une nouvelle marque
    this.router.navigate(['/protected/admin/manage-brand/one-brand']);
  }

  /**
   * Gestion de l'événement clic sur la boutton fermer la fenêtre courante
   * @memberof ListBrandComponent
   */
  onClickClose() {
    this.router.navigate(['/protected/admin']);
  }

}
