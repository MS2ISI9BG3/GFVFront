import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

/**
 * Intercepte les erreurs HTTP
 * @export
 * @class ErrorInterceptorService
 * @implements {HttpInterceptor}
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  /**
   * Creates an instance of ErrorInterceptorService.
   * @param {AuthenticationService} authenticationService
   * @param {Router} router
   * @memberof ErrorInterceptorService
   */
  constructor(
    private authenticationService: AuthenticationService, 
    private router: Router
    ) { }

    /**
     * Intercepte et gère les erreurs HTTP
     * @param {HttpRequest<any>} request Requête HTTP
     * @param {HttpHandler} next HTTP Handler
     * @returns {Observable<HttpEvent<any>>} Observable HTTP
     * @memberof ErrorInterceptorService
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
          retry(1), //Retry 1 time before throwing error
          catchError(err => {
            if (err.status === 401 && this.router.url.search(/\/login/) == -1) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                this.router.navigate(['/public/login/login']);
            }

            //const error = err.error.message || err.statusText;
            return throwError(err);
        }))
    }

}
