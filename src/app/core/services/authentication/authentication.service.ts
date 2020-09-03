import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as jwt_decode from "jwt-decode";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/entities/user';
import { MapperUserService } from '../mappers/mapper-user.service';
import { IToken } from 'src/app/shared/models/dto-interfaces/iToken';
import { Token } from 'src/app/shared/models/entities/token';
import { IUser } from 'src/app/shared/models/dto-interfaces/iUser';

/**
 * Gère l'authentification des utilisateurs à l'application
 * @export
 * @class AuthenticationService
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /**
   * Observable Subject de l'utilisateur courrant
   * @private
   * @type {BehaviorSubject<User>}
   * @memberof AuthenticationService
   */
  private currentUserSubject: BehaviorSubject<IUser>;
  /**
   * Partie commune de l'URL à l'API pour tous les appels
   * @private
   * @memberof AuthenticationService
   */
  private baseUrl = environment.baseUrl;
  /**
   * Observable de l'utilisateur
   * @type {Observable<User>}
   * @memberof AuthenticationService
   */
  public currentUser: Observable<IUser>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**
   * Creates an instance of AuthenticationService.
   * @param {HttpClient} http
   * @param {Router} router
   * @memberof AuthenticationService
   */
  constructor(
    private http: HttpClient,
    private router: Router,
    private mapperUser: MapperUserService) {
      this.initCurrentUser()
  }

  initCurrentUser() {
    this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Retourne l'utilisateur courrant
   * @readonly
   * @type {User}
   * @memberof AuthenticationService
   */
  public get currentUserValue(): User {
    this.currentUserSubject.value ? console.log('FIRSTNAME: '+this.currentUserSubject.value.firstName) : 'error!!!';
    return this.mapperUser.mapUser(this.currentUserSubject.value);
  }

  public nextCurrentUserSubject(user) {
    this.currentUserSubject.next(user)
  }

  /**
   * Identifie l'utilisateur à l'application
   * @param {string} username Nom d'utilisateur
   * @param {string} password Mot de passe
   * @returns Utilisateur
   * @memberof AuthenticationService
   */
  /*login(username: string, password: string) {
    return this.http.post<any>(this.baseUrl+'login_check', { username, password })
      .pipe(map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
          }

          return user;
      }));
  }*/
  login(login: string, password: string): Observable<Token> {
    console.log('username, password: '+login+' - '+password);
    return this.http.post<IToken>(this.baseUrl+'api/authenticate', { login, password }, this.httpOptions)
      .pipe(map( (token: IToken) => {
        return this.mapperUser.mapToken(token);
      }));
  }

  getUser(token?: string): Observable<User> {
    let options = this.httpOptions;
    console.log('options 1: '+JSON.stringify(options));
    console.log('TOKEN : '+token);
    if (token) {
      options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+token })
      };
      console.log('options 2: '+options.headers.getAll('Authorization'));
    }
    console.log('header => '+options.headers.getAll('Authorization'));
    return this.http.get<IUser>(this.baseUrl+'api/account', options)
    .pipe(
      map( (iuser: IUser) => {
        iuser.token = token;
        let user: User = this.mapperUser.mapUser(iuser);
        console.log('res getUser object: '+JSON.stringify(user));
        console.log('res getUser token: '+JSON.stringify(user.token));
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(iuser));
          this.currentUserSubject.next(iuser);
        }
        console.log('return user firstName: '+user.firstName);
        console.log('return user isAdmin: '+user.isAdmin);
        return user;
      })
    )
  }

  /**
   * Active le compte d'un utilisateur
   * @param {string} activationKey
   * @returns {Observable<boolean>}
   * @memberof AuthenticationService
   */
  activateUser(activationKey: string): Observable<boolean> {
    let params = new HttpParams().set("key",activationKey);
    return this.http.get<boolean>(this.baseUrl+'api/activate', { headers: this.httpOptions.headers, params: params } ).pipe(
      map( () => { return true; } )
    );
    //TODO return true si compte activé, false sinon
    //return of(true);//TODO delete mock
  }

  /**
   * Déconnecte l'utilisateur de l'application
   * @memberof AuthenticationService
   */
  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      this.router.navigate(['/public/login/login']);
  }

  /**
   * Retourne si l'utilisateur est administrateur ou non de l'application
   * @readonly
   * @type {boolean}
   * @memberof AuthenticationService
   */
  /*public get isAdmin(): boolean {
    //TODO DELETE MOCK when call API is ready
    return true;
    var isAdmin: boolean = false;
    console.log("this.currentUserSubject.value: "+JSON.stringify(this.currentUserSubject.value));
    console.log("token value: "+this.currentUserSubject.value.token);
    if(this.currentUserSubject.value){
      var token = this.getDecodedAccessToken(this.currentUserSubject.value.token);
      console.log("token: "+token);
      if (token) {
        var tabRole: Array<String> = token.roles;
        if (tabRole) {
          tabRole.forEach(role => {
            if(role == "ROLE_ADMIN"){
              isAdmin = true;
            }
          });
        }
      }
    }
    return isAdmin;
  }*/

  /**
   * Retourne le token décodé
   * @param {string} token JWT token
   * @returns {*} Token décodé
   * @memberof AuthenticationService
   */
  getDecodedAccessToken(token: string): any {
    try{
      return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
}
