import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs';

/**
 * Intercepte les requêtes HTTP
 * @export
 * @class JwtInterceptorService
 * @implements {HttpInterceptor}
 */
@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
  
  /**
   * Creates an instance of JwtInterceptorService.
   * @param {AuthenticationService} authenticationService
   * @memberof JwtInterceptorService
   */
  constructor(
      private authenticationService: AuthenticationService
      ) { }

  /**
   * Intercepte et ajoute un token aux requêtes HTTP
   * @param {HttpRequest<any>} request Requête HTTP
   * @param {HttpHandler} next HTTP Handler
   * @returns {Observable<HttpEvent<any>>} Observable HTTP
   * @memberof JwtInterceptorService
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercept!');
    // add authorization header with jwt token if available
    let currentUser = this.authenticationService.currentUserValue;
    console.log('currentUser => '+JSON.stringify(currentUser));
      if (currentUser && currentUser.token) {
          request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${currentUser.token}`
              }
          });
      }

      return next.handle(request);
  }
}