import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { MapperUserService } from '../mappers/mapper-user.service';
import { iUser } from 'src/app/shared/models/dto-interfaces/iUser';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/entities/user';
import { map, first } from 'rxjs/operators';

/**
 * Faux service pour gérant l'authentification de l'utilisateur
 * TODO à supprimer quand accès à la véritable API
 * @export
 * @class FakeRestUserService
 */
@Injectable({
  providedIn: 'root'
})
export class FakeRestUserService {

  private baseUrl = environment.baseUrl+"api/";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private authentication: AuthenticationService,
    private mapperUser: MapperUserService
  ) { }

  public login(username: string, password: string): Observable<User> {
    return this.http.get<iUser[]>(this.baseUrl+'login?username='+username, this.httpOptions)
      .pipe(
        map(iUser => {
        let user = this.mapperUser.mapUser(iUser[0]);
          // login successful if there's a jwt token in the response
          if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.authentication.nextCurrentUserSubject(user);
          }
          return user;
      }));
  }
}
