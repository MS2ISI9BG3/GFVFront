import { Brand } from './brand';

export class Model {

    private _modelId: number;
    private _modelName: string;
    private _carBrand: Brand;
    private _archived: boolean;

    constructor(
        modelId: number,
        modelName: string,
        carBrand: Brand,
        archived: boolean
    ) {
        this._modelId = modelId;
        this._modelName = modelName;
        this._carBrand = carBrand;
        this._archived = archived;
    }

    get modelId(): number { return this._modelId }
    get modelName(): string { return this._modelName }
    get carBrand(): Brand { return this._carBrand }
    get archived(): boolean { return this._archived }

    set modelName( name: string ) { this._modelName = name }
    set carBrand( carBrand: Brand ) { this._carBrand = carBrand }
    set archived( archived: boolean ) { this._archived = archived }

}
