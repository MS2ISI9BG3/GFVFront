import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { User } from 'src/app/shared/models/entities/user';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-menu-content',
  templateUrl: './menu-content.component.html',
  styleUrls: ['./menu-content.component.scss']
})
export class MenuContentComponent implements OnInit {

  @Output() showMenu = new EventEmitter();
  user: User;

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.user = this.authenticationService.currentUserValue;
  }

  onClickMenuIcon() {
    this.showMenu.emit();
  }

}
