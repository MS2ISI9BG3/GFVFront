import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {MapperCarService} from "../mappers/mapper-car.service";
import {ICar} from "../../../shared/models/dto-interfaces/iCar";
import {catchError, map} from "rxjs/operators";
import {Observable, of, throwError} from "rxjs";
import {Car} from "../../../shared/models/entities/car";

@Injectable({
  providedIn: 'root'
})
export class RestCarService {


  private baseUrl = environment.baseUrl + "api/cars/";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private mapperCar: MapperCarService
  ) {
  }

  public getCars() {
    return this.http.get<ICar[]>(this.baseUrl, this.httpOptions)
      .pipe(
        map(cars => {
            return this.mapperCar.mapCars(cars);
          },
          error => Observable.throw(error)),
        catchError(error => of(error))
      );
  }

  public getCar(id: string): Observable<Car> {
    return this.http.get<ICar>(this.baseUrl + id, this.httpOptions)
      .pipe(
        map((car: ICar) => {
            return this.mapperCar.mapCar(car);
          },
          error => Observable.throw(error)),
        catchError(error => {
          return throwError(error)
        })
      );
  }


  public addCar(car: Car): Observable<Car> {
    let iCar: ICar = this.mapperCar.mapICar(car);
    return this.http.post<ICar>(this.baseUrl, iCar, this.httpOptions)
      .pipe(
        map(iCar => {
            return this.mapperCar.mapCar(iCar)
          },
          error => Observable.throw(error)),
        catchError(error => of(error))
      );
  }

  public updateCar(car: Car): Observable<Car> {
    let iCar: ICar = this.mapperCar.mapICar(car);
    return this.http.put<ICar>(this.baseUrl, iCar, this.httpOptions)
      .pipe(
        map(iCar => {
            return this.mapperCar.mapCar(iCar)
          },
          error => Observable.throw(error)),
        catchError(error => of(error))
      );
  }


  public deleteCar(car: (Car | number)): Observable<Car> {
    let id = car instanceof Car ? car.carId : car;
    return this.http.put<ICar>(`${this.baseUrl}archive/${id}`, this.httpOptions)
      .pipe(
        catchError(error => of(error))
      );
  }

  public getCarByPlace(departureSiteId: string, arrivalSiteId: string, departureDate: string, arrivalDate: string): Observable<Car[]> {
    let params = new HttpParams()
      .set("departureSiteId",departureSiteId)
      .set("arrivalSiteId",arrivalSiteId)
      .set("departureDate",departureDate)
      .set("arrivalDate",arrivalDate);
    return this.http.get<ICar[]>(this.baseUrl + 'available/sites/', { headers: this.httpOptions.headers, params: params })
      .pipe(
        map(cars => {
            return this.mapperCar.mapCars(cars);
          },
          error => Observable.throw(error)),
        catchError(error => {
          return throwError(error)
        })
      );
  }
}
