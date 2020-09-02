export class Brand {

    private _brandId: number;
    private _brandName: string;
    private _archived: boolean;

    constructor(
        brandId: number,
        brandName: string,
        archived: boolean
    ) {
        this._brandId = brandId;
        this._brandName = brandName;
        this._archived = archived;
    }

    get brandId(): number { return this._brandId }
    get brandName(): string { return this._brandName }
    get archived(): boolean { return this._archived }

    set brandName( name: string ) { this._brandName = name }
    set archived( archived: boolean ) { this._archived = archived }

}
