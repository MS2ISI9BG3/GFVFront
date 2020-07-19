export class Brand {

    private _brandId: number;
    private _brandName: string;

    constructor(
        brandId: number,
        brandName: string
    ) {
        this._brandId = brandId;
        this._brandName = brandName
    }

    get brandId(): number { return this._brandId }
    get brandName(): string { return this._brandName }

}
