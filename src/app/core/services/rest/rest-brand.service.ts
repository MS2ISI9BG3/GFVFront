import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MapperBrandService } from '../mappers/mapper-brand.service';
import { Observable, throwError } from 'rxjs';
import { Brand } from 'src/app/shared/models/entities/brand';
import { IBrand } from 'src/app/shared/models/dto-interfaces/iBrand';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestBrandService {

  private baseUrl = environment.baseUrl+"api/brands/";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(
    private http: HttpClient,
    private mapperBrand: MapperBrandService
  ) { }

  public getBrands(): Observable<Brand[]> {
    return this.http.get<IBrand[]>(this.baseUrl, this.httpOptions)
      .pipe(
        map(brands => {
          return this.mapperBrand.mapBrands(brands);
        },
        error => Observable.throw(error)),
        catchError(error => { return throwError(error) })
      );
  }

  public getBrand(id: string): Observable<Brand> {
    return this.http.get<IBrand>(this.baseUrl+id, this.httpOptions)
      .pipe(
        map( (brand: IBrand) => {
          return this.mapperBrand.mapBrand(brand);
        },
        error => Observable.throw(error)),
        catchError(error => { return throwError(error) })
      );
  }

  public addBrand(brand: Brand): Observable<Brand> {
    let iBrand: IBrand = this.mapperBrand.mapIBrand(brand);
    return this.http.post<IBrand>(this.baseUrl, iBrand, this.httpOptions)
      .pipe(
        map(iBrand => {
          return this.mapperBrand.mapBrand(iBrand)
        }, 
        error => Observable.throw(error)),
        catchError(error => { return throwError(error) })
      );
  }

  public updateBrand(brand: Brand): Observable<Brand> {
    let iBrand: IBrand = this.mapperBrand.mapIBrand(brand);
    return this.http.put<IBrand>(this.baseUrl, iBrand, this.httpOptions)
      .pipe(
        map( (brand: IBrand) => {
          return this.mapperBrand.mapBrand(brand);
        },
        error => Observable.throw(error)),
        catchError(error => { return throwError(error) })
      );
  }
  
}
