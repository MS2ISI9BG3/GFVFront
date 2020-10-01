import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/shared/models/entities/user';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { MapperUserService } from '../../services/mappers/mapper-user.service';
import { IUser } from 'src/app/shared/models/dto-interfaces/iUser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-menu-content',
  templateUrl: './menu-content.component.html',
  styleUrls: ['./menu-content.component.scss']
})
export class MenuContentComponent implements OnInit {

  @Output() hideMenu = new EventEmitter();
  public user: User;
  public userRole: string;
  public libCurrentRoute: 'borrow' | 'ride' | 'history' | 'employee' | 'car' | 'brand' | 'model' | 'place' | 'loan' | 'incident';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private mapperUser: MapperUserService
  ) { }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe( ( event: NavigationEnd ) => {
        this.libCurrentRoute = this.updateLibCurrentRoute(event.urlAfterRedirects);
      });
    this.authenticationService.currentUser.subscribe(
      ( iuser: IUser ) => {
        this.user = this.mapperUser.mapUser(iuser);
        if ( this.user ) this.userRole = this.user.isAdmin ? 'Administrateur' : 'Utilisateur';
    });
  }

  updateLibCurrentRoute(url: string): 'borrow' | 'ride' | 'history' | 'employee' | 'car' | 'brand' | 'model' | 'place' | 'loan' | 'incident' {
    if (url == '/protected/user/manage-ride/one-ride') return 'borrow' 
    if (url == '/protected/user/manage-ride/manage-ride/current') return 'ride';
    if (url == '/protected/user/manage-ride/manage-ride/history') return 'history';
    if (url.includes('/protected/admin/manage-user')) return 'employee';
    if (url.includes('/protected/admin/manage-car')) return 'car';
    if (url.includes('/protected/admin/manage-brand')) return 'brand';
    if (url.includes('/protected/admin/manage-model')) return 'model';
    if (url.includes('/protected/admin/manage-place')) return 'place';
    if (url.includes('/protected/admin/booking-confirm/booking-confirm')) return 'loan';
    if (url == '/protected/admin/show-report/show-report') return 'incident';
    return null;
  }

  onClickBorrow() {
    this.hideMenu.emit();
    this.router.navigate(['protected/user/manage-ride/one-ride']);
  }

  onClickRide() {
    this.hideMenu.emit();
    this.router.navigate(['protected/user/manage-ride/manage-ride/current']);
  }

  onClickHistory() {
    this.hideMenu.emit();
    this.router.navigate(['protected/user/manage-ride/manage-ride/history']);//protected/user/report/report
  }

  onClickEmployee() {
    this.hideMenu.emit();
    this.router.navigate(['protected/admin/manage-user/manage-user']);
  }

  onClickCar() {
    this.hideMenu.emit();
    this.router.navigate(['protected/admin/manage-car/manage-car']);
  }

  onClickBrand() {
    this.hideMenu.emit();
    this.router.navigate(['protected/admin/manage-brand/manage-brand']);
  }

  onClickModel() {
    this.hideMenu.emit();
    this.router.navigate(['protected/admin/manage-model/manage-model']);
  }

  onClickPlace() {
    this.hideMenu.emit();
    this.router.navigate(['protected/admin/manage-place/manage-place']);
  }

  onClickLoan() {
    this.hideMenu.emit();
    this.router.navigate(['protected/admin/booking-confirm/booking-confirm']);
  }

  /*onClickIncident() {
    this.hideMenu.emit();
    this.router.navigate(['protected/admin/show-report/show-report']);
  }*/

  onClickLogout() {
    this.hideMenu.emit();
    this.authenticationService.logout();
  }

}
