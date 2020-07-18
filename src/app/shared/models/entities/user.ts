import { isArray } from 'util';

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
    private _login: string;
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
     * Est un utilisateur administrateur de l'application
     * @type {boolean}
     * @memberof User
     */
    private _isAdmin: boolean;
    /**
     * Token de connexion à l'API
     * @type {string}
     * @memberof User
     */
    private _token?: string;

    constructor(
        id: number, 
        login: string, 
        password: string, 
        firstName: string, 
        lastName: string,  
        authorities: string[],
        token?: string) {

            this._id = id;
            this._login = login;
            this._password = password;
            this._firstName = firstName;
            this._lastName = lastName;
            console.log('authorities: '+JSON.stringify(authorities));
            console.log('isArray(authorities): '+isArray(authorities));
            console.log('authorities.find: '+authorities.find( a => a == 'ROLE_ADMIN' ));
            if (authorities && isArray(authorities)) {
                (authorities.find( a => a == 'ROLE_ADMIN' ) != undefined) ? this._isAdmin = true : this._isAdmin = false;
            } else this._isAdmin = false;
            this._token = token || '';
            //this._isAdmin = true; //TODO remove for test
    }

    get id(): number { return this._id; }
    get login(): string { return this._login; }
    //get password(): string { return this._password; }
    get firstName(): string { return this._firstName; }
    get lastName(): string { return this._lastName; }
    get token(): string { return this._token }
    get isAdmin(): boolean { return this._isAdmin }
    
}
