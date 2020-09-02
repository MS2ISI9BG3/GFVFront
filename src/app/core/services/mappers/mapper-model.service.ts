import { Injectable } from '@angular/core';
import { IModel } from 'src/app/shared/models/dto-interfaces/iModel';
import { Model } from 'src/app/shared/models/entities/model';
import { MapperBrandService } from './mapper-brand.service';

@Injectable({
  providedIn: 'root'
})
export class MapperModelService {

  constructor(
    private mapperBrand: MapperBrandService
  ) { }

  /**
   * Transforme une interface de liste de modele en objet de liste de modele
   * @param {IModel[]} models
   * @returns {Model[]}
   * @memberof MapperModelService
   */
  public mapModels(models: IModel[]): Model[] {
    return models.map(model => {
      return this.mapModel(model);
    });
  }

  /**
   * Transforme une interface modele en objet modele
   * @param {IModel} model
   * @returns {Model}
   * @memberof MapperModelService
   */
  public mapModel(model: IModel): Model {
    return new Model(
      Number(model.modelId),
      model.modelName,
      this.mapperBrand.mapBrand(model.carBrand),
      Boolean(model.archived)
    );
  }

  /**
   * Transforme un objet modele une interface modele
   * @param {Model} model
   * @returns {IModel}
   * @memberof MapperModelService
   */
  mapIModel(model: Model): IModel {
    return {
      modelId: String(model.modelId),
      modelName: model.modelName,
      carBrand: this.mapperBrand.mapIBrand(model.carBrand),
      archived: String(model.archived)
    }
  }

}
