/**
 * Token
 * @export
 * @class User
 */
export class Token {

    /**
     * Numéro de token
     * @type {string}
     * @memberof Token
     */
    private _idToken: string;

    constructor(
        idToken: string
    ) {
        this._idToken = idToken;
    }

    get idToken(): string { return this._idToken; }
    
}