import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MapperModelService } from '../mappers/mapper-model.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Model } from 'src/app/shared/models/entities/model';
import { IModel } from 'src/app/shared/models/dto-interfaces/iModel';

@Injectable({
  providedIn: 'root'
})
export class RestModelService {

  private baseUrl = environment.baseUrl+"api/models/";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(
    private http: HttpClient,
    private mapperModel: MapperModelService
  ) { }

  public getModels(): Observable<Model[]> {
    return this.http.get<IModel[]>(this.baseUrl, this.httpOptions)
      .pipe(
        map(models => {
          return this.mapperModel.mapModels(models);
        },
        error => Observable.throw(error)),
        catchError(error => { return throwError(error) })
      );
  }

  public getModel(id: string): Observable<Model> {
    return this.http.get<IModel>(this.baseUrl+id, this.httpOptions)
      .pipe(
        map( (model: IModel) => {
          return this.mapperModel.mapModel(model);
        },
        error => Observable.throw(error)),
        catchError(error => { return throwError(error) })
      );
  }

  public addModel(model: Model): Observable<Model> {
    let iModel: IModel = this.mapperModel.mapIModel(model);
    return this.http.post<IModel>(this.baseUrl, iModel, this.httpOptions)
      .pipe(
        map(iModel => {
          return this.mapperModel.mapModel(iModel)
        }, 
        error => Observable.throw(error)),
        catchError(error => { return throwError(error) })
      );
  }

  public updateModel(model: Model): Observable<Model> {
    let iModel: IModel = this.mapperModel.mapIModel(model);
    return this.http.put<IModel>(this.baseUrl, iModel, this.httpOptions)
      .pipe(
        map( (model: IModel) => {
          return this.mapperModel.mapModel(model);
        },
        error => Observable.throw(error)),
        catchError(error => { return throwError(error) })
      );
  }

}
