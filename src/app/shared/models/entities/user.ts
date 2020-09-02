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
     * E-mail de l'utilisateur
     * @type {string}
     * @memberof User
     */
      private _email: string;

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

    /**
     * Numéro de téléphone
     * @type {string}
     * @memberof User
     */
    private _phoneNumber?: string;

    /**
     * Est un utilisateur actif
     * @type {boolean}
     * @memberof User
     */
    private _activated?: boolean;

    /**
     * Est un utilisateur archivé
     * @type {boolean}
     * @memberof User
     */
    private _archived?: boolean;

    constructor(
        id: number,
        login: string,
        password: string,
        firstName: string,
        lastName: string,
        email: string,
        authorities: string[],
        isActivated: boolean,
        isArchived: boolean,
        token?: string,
        phoneNumber?: string ) {

            this._id = id;
            this._login = login;
            this._password = password;
            this._firstName = firstName;
            this._lastName = lastName;
            this._email = email;
            this._activated = isActivated;
            this._archived = isArchived;
            console.log('authorities: '+JSON.stringify(authorities));
            console.log('isArray(authorities): '+isArray(authorities));
            console.log('authorities.find: '+authorities.find( a => a == 'ROLE_ADMIN' ));
            if (authorities && isArray(authorities)) {
                (authorities.find( a => a == 'ROLE_ADMIN' ) != undefined) ? this._isAdmin = true : this._isAdmin = false;
            } else this._isAdmin = false;
            this._token = token || '';
            this._phoneNumber = phoneNumber || '';
            //this._isAdmin = true; //TODO remove for test
    }

    get id(): number { return this._id; }
    get login(): string { return this._login; }
    //get password(): string { return this._password; }
    get firstName(): string { return this._firstName; }
    get lastName(): string { return this._lastName; }
    get email(): string { return this._email; }
    get token(): string { return this._token }
    get isAdmin(): boolean { return this._isAdmin }
    get activated(): boolean { return this._activated }
    get archived(): boolean { return this._archived }
    get phoneNumber(): string { return this._phoneNumber }


  set id(value: number) {
    this._id = value;
  }

  set login(value: string) {
    this._login = value;
  }

  set password(value: string) {
    this._password = value;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  set isAdmin(value: boolean) {
    this._isAdmin = value;
  }

  set token(value: string) {
    this._token = value;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  set activated(value: boolean) {
    this._activated = value;
  }

  set archived(value: boolean) {
    this._archived = value;
  }

  set email(value: string) {
    this._email = value;
  }
}
