import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router, 
    private authenticationService: AuthenticationService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = this.authenticationService.currentUserValue;
    console.log('auth guard currentUser => '+JSON.stringify(currentUser));
    if (currentUser) {
        if (state.url.includes("/admin") && this.authenticationService.isAdmin == false) {
          // Si l'utilisateur essaye d'accéder à la zone admin de l'application
          // alors qu'il n'a pas les droits d'administration :
          // il est redirigé vers la page d'accueil
          this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
          return false;
        }
        // logged in so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/public/login/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
