export class Place {

    /**
     * Identifiant unique du lieu
     * @private
     * @type {number}
     * @memberof Place
     */
    private _siteId: number;
    /**
     * Nom du lieu
     * @private
     * @type {number}
     * @memberof Place
     */
    private _siteName: string;
    /**
     * Adresse (numéro et rue) du lieu
     * @private
     * @type {number}
     * @memberof Place
     */
    private _siteAddress: string;
    /**
     * Téléphone du lieu
     * @private
     * @type {number}
     * @memberof Place
     */
    private _sitePhoneNumber: string;
    /**
     * Est un lieu archivé ou non
     * @private
     * @type {number}
     * @memberof Place
     */
    private _archived: boolean;

    /**
     * Creates an instance of Place.
     * @param {number} siteId Identifiant unique du lieu
     * @param {string} siteName Nom du lieu
     * @param {string} siteAddress Adresse du lieu
     * @param {string} zipCode Code postal du lieu
     * @param {string} city Ville du lieu
     * @param {string} sitePhoneNumber Téléphone du lieu
     * @param {boolean} [archived=false] Est archivé ou non
     * @memberof Place
     */
    constructor(siteId: number, siteName: string, siteAddress: string, sitePhoneNumber: string, archived: boolean = false) {
        this._siteId = siteId;
        this._siteName = siteName;
        this._siteAddress = siteAddress;
        this._sitePhoneNumber = sitePhoneNumber;
        this._archived = archived;
    }

    /**
     * Récupère l'identifiant unique du lieu
     * @readonly
     * @type {number}
     * @memberof Place
     */
    get siteId(): number { return this._siteId }
    /**
     * Récupère le nom du lieu
     * @readonly
     * @type {number}
     * @memberof Place
     */
    get siteName(): string { return this._siteName }
    /**
     * Récupère l'adresse du lieu
     * @readonly
     * @type {number}
     * @memberof Place
     */
    get siteAddress(): string { return this._siteAddress }
    /**
     * Récupère le téléphone du lieu
     * @readonly
     * @type {number}
     * @memberof Place
     */
    get sitePhoneNumber(): string { return this._sitePhoneNumber }
    /**
     * Récupère si le lieu est archivé ou non
     * @readonly
     * @type {number}
     * @memberof Place
     */
    get archived(): boolean { return this._archived }

    /**
     * Modifie le nom du lieu
     * @memberof Place
     */
    set siteName(siteName: string) { this._siteName = siteName }
    /**
     * Modifie l'adresse du lieu
     * @memberof Place
     */
    set siteAddress(siteAddress: string) { this._siteAddress = siteAddress }
    /**
     * Modifie le téléphone du lieu
     * @memberof Place
     */
    set sitePhoneNumber(sitePhoneNumber: string) { this._sitePhoneNumber = sitePhoneNumber }
    /**
     * Modifie si le lieu est archivé ou non
     * @memberof Place
     */
    set archived(archived: boolean) { this._archived = archived }
    
}
