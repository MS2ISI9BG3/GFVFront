import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  openSnackBar(msg: string, duration: number, color: 'warning' | 'danger' | 'success', error?: any) {

    let message: string = String(msg).startsWith('Error: ') ? String(msg).slice(7) : msg;
    if (error && error.error && error.error.error && error.error.error.message) {
      message = error.error.error.message;
    }
    //TODO color
    this._snackBar.open(message, '', {
      duration: duration,
      panelClass: color == 'success' ? 'success-alert' : (color == 'warning' ? 'warning-alert' : 'danger-alert')
    });
    
    if (color == 'danger') { console.error(message); console.error('Details :'+error? JSON.stringify(error) : 'aucun') };
    if (color == 'warning') { console.warn(message); console.warn('Details :'+error? JSON.stringify(error) : 'aucun') };
    if (color == 'success') console.log(message);
    //throw new Error(msg);
  }

}
