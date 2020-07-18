import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('sidenav', { static: false }) public sidenav: MatSidenav;

  onShowMenu() {
    console.log('toogle!');
    this.sidenav.toggle();
  }

  onHideMenu() {
    this.sidenav.close();
  }

}
