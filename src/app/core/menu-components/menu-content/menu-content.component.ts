import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/shared/models/entities/user';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { MapperUserService } from '../../services/mappers/mapper-user.service';
import { iUser } from 'src/app/shared/models/dto-interfaces/iUser';

@Component({
  selector: 'app-menu-content',
  templateUrl: './menu-content.component.html',
  styleUrls: ['./menu-content.component.scss']
})
export class MenuContentComponent implements OnInit {

  @Output() hideMenu = new EventEmitter();
  public user: User;
  public userRole: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private mapperUser: MapperUserService
  ) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(
      ( iuser: iUser ) => {
        this.user = this.mapperUser.mapUser(iuser);
        if ( this.user ) this.userRole = this.user.isAdmin ? 'Administrateur' : 'Utilisateur';
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
    this.router.navigate(['protected/user/manage-ride/manage-ride']);//protected/user/report/report
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
