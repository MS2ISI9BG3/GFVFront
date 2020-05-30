import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MapperCarService} from "../mappers/mapper-car.service";
import {ICar} from "../../../shared/models/dto-interfaces/iCar";
import {catchError, map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Car} from "../../../shared/models/entities/car";

@Injectable({
  providedIn: 'root'
})
export class RestCarService {


  private baseUrl = environment.baseUrl + "api/car/";

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
        catchError(error => of(error))
      );
  }


  public deleteCar(car: (Car | number)): Observable<Car> {
    let id = car instanceof Car ? car.id : car;
    return this.http.delete(`${this.baseUrl}+${id}`, this.httpOptions)
      .pipe(
        catchError(error => of(error))
      );
  }


}