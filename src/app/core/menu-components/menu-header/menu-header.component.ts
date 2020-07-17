import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { User } from 'src/app/shared/models/entities/user';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss']
})
export class MenuHeaderComponent implements OnInit {

  @Output() hideMenu = new EventEmitter();
  public user: User;
  public userRole: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(
      ( user: User ) => {
        this.user = <User>user;
        if ( user ) this.userRole = user.isAdmin ? 'Administrateur' : 'Utilisateur';
    });
  }

  onClickBorrow() {
    this.hideMenu.emit();
    this.router.navigate(['protected/user/booking-ride/booking-ride']);
  }

  onClickRide() {
    this.hideMenu.emit();
    this.router.navigate(['protected/user/manage-ride/manage-ride']);
  }

  onClickHistory() {
    this.hideMenu.emit();
    this.router.navigate(['protected/user/report/report']);
  }

  onClickEmployee() {
    this.hideMenu.emit();
    this.router.navigate(['protected/admin/manage-user/manage-user']);
  }

  onClickCar() {
    this.hideMenu.emit();
    this.router.navigate(['protected/admin/manage-car/manage-car']);
  }

  onClickPlace() {
    this.hideMenu.emit();
    this.router.navigate(['protected/admin/manage-place/manage-place']);
  }

  onClickLoan() {
    this.hideMenu.emit();
    this.router.navigate(['protected/admin/booking-confirm/booking-confirm']);
  }

  onClickIncident() {
    this.hideMenu.emit();
    this.router.navigate(['protected/admin/show-report/show-report']);
  }

  onClickLogout() {
    this.hideMenu.emit();
    this.authenticationService.logout();
  }

}
