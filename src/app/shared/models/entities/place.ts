export class Place {

    /**
     * Identifiant unique du lieu
     * @private
     * @type {number}
     * @memberof Place
     */
    private _id: number;
    /**
     * Nom du lieu
     * @private
     * @type {number}
     * @memberof Place
     */
    private _name: string;
    /**
     * Adresse (numéro et rue) du lieu
     * @private
     * @type {number}
     * @memberof Place
     */
    private _address: string;
    /**
     * Code postal du lieu
     * @private
     * @type {number}
     * @memberof Place
     */
    private _zipCode: string;
    /**
     * Ville du lieu
     * @private
     * @type {number}
     * @memberof Place
     */
    private _city: string;
    /**
     * Téléphone du lieu
     * @private
     * @type {number}
     * @memberof Place
     */
    private _phone: string;
    /**
     * Est un lieu archivé ou non
     * @private
     * @type {number}
     * @memberof Place
     */
    private _isArchive: boolean;

    /**
     * Creates an instance of Place.
     * @param {number} id Identifiant unique du lieu
     * @param {string} name Nom du lieu
     * @param {string} address Adresse du lieu
     * @param {string} zipCode Code postal du lieu
     * @param {string} city Ville du lieu
     * @param {string} phone Téléphone du lieu
     * @param {boolean} [isArchive=false] Est archivé ou non
     * @memberof Place
     */
    constructor(id: number, name: string, address: string, zipCode: string, city: string, phone: string, isArchive: boolean = false) {
        this._id = id;
        this._name = name;
        this._address = address;
        this._zipCode = zipCode;
        this._city = city;
        this._phone = phone;
        this._isArchive = isArchive;
    }

    /**
     * Récupère l'identifiant unique du lieu
     * @readonly
     * @type {number}
     * @memberof Place
     */
    get id(): number { return this._id }
    /**
     * Récupère le nom du lieu
     * @readonly
     * @type {number}
     * @memberof Place
     */
    get name(): string { return this._name }
    /**
     * Récupère l'adresse du lieu
     * @readonly
     * @type {number}
     * @memberof Place
     */
    get address(): string { return this._address }
    /**
     * Récupère le code postal du lieu
     * @readonly
     * @type {number}
     * @memberof Place
     */
    get zipCode(): string { return this._zipCode }
    /**
     * Récupère la ville du lieu
     * @readonly
     * @type {number}
     * @memberof Place
     */
    get city(): string { return this._city }
    /**
     * Récupère le téléphone du lieu
     * @readonly
     * @type {number}
     * @memberof Place
     */
    get phone(): string { return this._phone }
    /**
     * Récupère si le lieu est archivé ou non
     * @readonly
     * @type {number}
     * @memberof Place
     */
    get isArchive(): boolean { return this._isArchive }

    /**
     * Modifie le nom du lieu
     * @memberof Place
     */
    set name(name: string) { this._name = name }
    /**
     * Modifie l'adresse du lieu
     * @memberof Place
     */
    set address(address: string) { this._address = address }
    /**
     * Modifie le code postal du lieu
     * @memberof Place
     */
    set zipCode(zipCode: string) { this._zipCode = zipCode }
    /**
     * Modifie la ville du lieu
     * @memberof Place
     */
    set city(city: string) { this._city = city }
    /**
     * Modifie le téléphone du lieu
     * @memberof Place
     */
    set phone(phone: string) { this._phone = phone }
    /**
     * Modifie si le lieu est archivé ou non
     * @memberof Place
     */
    set isArchive(isArchive: boolean) { this._isArchive = isArchive }
    
}