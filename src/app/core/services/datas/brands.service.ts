import { Injectable } from '@angular/core';
import { Brand } from 'src/app/shared/models/entities/brand';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  private _brands: Brand[] = [];
  private _brandsSubject = new BehaviorSubject(this._brands);
  public brands$ = this._brandsSubject.asObservable();

  constructor() { }

  nextBrands(brands: Brand[]) {
    this._brands = brands;
    this._brandsSubject.next(this._brands);
  }

  nextBrandUpdated(brand: Brand) {
    if (brand) {
      const index = this._brands.findIndex( b => b.brandId == brand.brandId );
      this._brands[index] = brand;
      this._brandsSubject.next(this._brands);
    }
  }

  nextBrandCreated(brand: Brand) {
    if (brand) {
      this._brands.push(brand);
      this._brandsSubject.next(this._brands);
    }
  }

  nextBrandDeleted(brand: Brand) {
    if (brand) {
      let index: number = this._brands.findIndex( b => b.brandId == brand.brandId );
      this._brands.slice(index);
      this._brandsSubject.next(this._brands);
    }
  }

}
