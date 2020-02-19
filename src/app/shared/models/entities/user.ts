/**
 * Utilisateur de l'application
 * @export
 * @class User
 */
export class User {

    /**
     * Identifiant unique de l'utilisateur
     * @type {numnber}
     * @memberof User
     */
    private _id: number;
    /**
     * Nom d'utilisateur
     * @type {string}
     * @memberof User
     */
    private _username: string;
    /**
     * Mot de passe de l'utilisateur
     * @type {string}
     * @memberof User
     */
    private _password: string;
    /**
     * Prénom de l'utilisateur
     * @type {string}
     * @memberof User
     */
    private _firstName: string;
    /**
     * Nom de l'utilisateur
     * @type {string}
     * @memberof User
     */
    private _lastName: string;
    /**
     * Token de connexion à l'API
     * @type {string}
     * @memberof User
     */
    private _token?: string;
    /**
     * Est un utilisateur administrateur de l'application
     * @type {boolean}
     * @memberof User
     */
    private _isAdmin: boolean;

    constructor(
        id: number, 
        username: string, 
        password: string, 
        firstName: string, 
        lastName: string, 
        token: string, 
        isAdmin: boolean) {

            this._id = id;
            this._username = username;
            this._password = password;
            this._firstName = firstName;
            this._lastName = lastName;
            this._token = token;
            this._isAdmin = isAdmin;
    }

    get id(): number { return this._id; }
    get username(): string { return this._username; }
    //get password(): string { return this._password; } //TODO
    get firstName(): string { return this._firstName; }
    get lastName(): string { return this._lastName; }
    get token(): string { return this._token }
    get isAdmin(): boolean { return this._isAdmin }
    
}