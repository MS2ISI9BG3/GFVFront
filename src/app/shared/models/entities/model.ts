import { Brand } from './brand';

export class Model {

    private _modelId: number;
    private _modelName: string;
    private _carBrand: Brand;

    constructor(
        modelId: number,
        modelName: string,
        carBrand: Brand
    ) {
        this._modelId = modelId;
        this._modelName = modelName;
        this._carBrand = carBrand;
    }

    get modelId(): number { return this._modelId }
    get modelName(): string { return this._modelName }
    get carBrand(): Brand { return this._carBrand }

}
