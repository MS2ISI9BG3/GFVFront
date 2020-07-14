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
        this.user = user;
        if ( user ) this.userRole = user.isAdmin ? 'Administrateur' : 'Utilisateur';
    });
  }

  onClickPlace() {
    this.hideMenu.emit();
    this.router.navigate(['/protected/admin/manage-place/manage-place']);
  }

  onClickLogout() {
    this.hideMenu.emit();
    this.authenticationService.logout();
  }

}
