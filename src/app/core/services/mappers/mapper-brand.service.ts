import { Injectable } from '@angular/core';
import { IBrand } from 'src/app/shared/models/dto-interfaces/iBrand';
import { Brand } from 'src/app/shared/models/entities/brand';

@Injectable({
  providedIn: 'root'
})
export class MapperBrandService {

  constructor() { }

  /**
   * Transforme une interface de liste de marque en objet de liste de marque
   * @param {IBrand[]} brands
   * @returns {Brand[]}
   * @memberof MapperBrandService
   */
  public mapBrands(brands: IBrand[]): Brand[] {
    return brands.map(brand => {
      return this.mapBrand(brand);
    });
  }

  /**
   * Transforme une interface marque en objet marque
   * @param {IBrand} brand
   * @returns {Brand}
   * @memberof MapperBrandService
   */
  public mapBrand(brand: IBrand): Brand {
    return new Brand(
      Number(brand.brandId),
      brand.brandName
    );
  }

  /**
   * Transforme un objet marque une interface marque
   * @param {Brand} brand
   * @returns {IBrand}
   * @memberof MapperBrandService
   */
  mapIBrand(brand: Brand): IBrand {
    return {
      brandId: String(brand.brandId),
      brandName: brand.brandName
    }
  }

}
