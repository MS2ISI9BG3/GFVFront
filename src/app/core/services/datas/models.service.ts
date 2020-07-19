import { Injectable } from '@angular/core';
import { Model } from 'src/app/shared/models/entities/model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  private _models: Model[] = [];
  private _modelsSubject = new BehaviorSubject(this._models);
  public models$ = this._modelsSubject.asObservable();

  constructor() { }

  nextMOdels(models: Model[]) {
    this._models = models;
    this._modelsSubject.next(this._models);
  }

  nextModelUpdated(model: Model) {
    if (model) {
      const index = this._models.findIndex( m => m.modelId == model.modelId );
      this._models[index] = model;
      this._modelsSubject.next(this._models);
    }
  }

  nextModelCreated(model: Model) {
    if (model) {
      this._models.push(model);
      this._modelsSubject.next(this._models);
    }
  }

  nextModelDeleted(model: Model) {
    if (model) {
      let index: number = this._models.findIndex( m => m.modelId == model.modelId );
      this._models.slice(index);
      this._modelsSubject.next(this._models);
    }
  }

}
