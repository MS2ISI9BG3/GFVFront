import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from 'src/app/shared/models/entities/user';
import {Observable, throwError} from 'rxjs';
import { IUser } from 'src/app/shared/models/dto-interfaces/iUser';
import { MapperUserService } from '../mappers/mapper-user.service';
import {Place} from '../../../shared/models/entities/place';
import {IPlace} from '../../../shared/models/dto-interfaces/iPlace';

/**
 * Classe gérant l'authentification des utilisateurs
 * TODO quand appel à l'API non mockée possible
 * @export
 * @class RestUserService
 */
@Injectable({
  providedIn: 'root'
})
export class RestUserService {

  private baseUrl = environment.baseUrl+"api/users/";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private authentication: AuthenticationService,
    private mapperUser: MapperUserService
  ) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<IUser[]>(this.baseUrl, this.httpOptions)
      .pipe(
        map(users => {
            return this.mapperUser.mapUsers(users);
          },
          error => Observable.throw(error)),
        catchError(error => { return throwError(error) })
      );
  }

  public getUser(login: string): Observable<User> {
    return this.http.get<IUser>(this.baseUrl+login, this.httpOptions)
      .pipe(
        map( (user: IUser) => {
            return this.mapperUser.mapUser(user);
          },
          error => Observable.throw(error)),
        catchError(error => { return throwError(error) })
      );
  }

  public updateUser(user: User): Observable<User> {
    let iUser: IUser = this.mapperUser.mapIUser(user);
    return this.http.put<IUser>(this.baseUrl, iUser, this.httpOptions)
      .pipe(
        map( (user: IUser) => {
            return this.mapperUser.mapUser(user);
          },
          error => Observable.throw(error)),
        catchError(error => { return throwError(error) })
      );
  }

  public addUser(user: User): Observable<User> {
    let iUser: IUser = this.mapperUser.mapIUser(user);
    return this.http.post<IUser>(this.baseUrl, iUser, this.httpOptions)
      .pipe(
        map(iUser => {
            return this.mapperUser.mapUser(iUser)
          },
          error => Observable.throw(error)),
        catchError(error => { return throwError(error) })
      );
  }

  // Utilisation d'authenticationService
  /*public login(login: string, password: string): Observable<User> {
    return this.http.post<iUser>(this.baseUrl+'authenticate', { login, password }, this.httpOptions)
      .pipe(map(iUser => {
        let user: User = this.mapperUser.mapUser(iUser);
          // login successful if there's a jwt token in the response
          if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.authentication.nextCurrentUserSubject(user);
          }
          return user;
      }));
  }

  public logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.authentication.nextCurrentUserSubject(null);
    //this.router.navigate(['/login']); TODO
  }*/
}
