import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBtnClose]'
})
export class BtnCloseDirective {

  constructor(el: ElementRef) {
  }

}
