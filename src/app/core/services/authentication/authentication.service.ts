import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as jwt_decode from "jwt-decode";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/entities/user';

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
  private currentUserSubject: BehaviorSubject<User>;
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
  public currentUser: Observable<User>;

  /**
   * Creates an instance of AuthenticationService.
   * @param {HttpClient} http
   * @param {Router} router
   * @memberof AuthenticationService
   */
  constructor(
    private http: HttpClient,
    private router: Router) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Retourne l'utilisateur courrant
   * @readonly
   * @type {User}
   * @memberof AuthenticationService
   */
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
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

  /**
   * Déconnecte l'utilisateur de l'application
   * @memberof AuthenticationService
   */
  /*logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      this.router.navigate(['/login']);
  }*/

  /**
   * Retourne si l'utilisateur est administrateur ou non de l'application
   * @readonly
   * @type {boolean}
   * @memberof AuthenticationService
   */
  public get isAdmin(): boolean {
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
  }
  
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
