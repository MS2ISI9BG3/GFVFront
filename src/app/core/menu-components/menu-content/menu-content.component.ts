import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-menu-content',
  templateUrl: './menu-content.component.html',
  styleUrls: ['./menu-content.component.scss']
})
export class MenuContentComponent implements OnInit {

  @Output() showMenu = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClickMenuIcon() {
    this.showMenu.emit();
  }

}
