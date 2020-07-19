import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

/**
 * Gestion des messages affichés sous forme de snackbar
 * @export
 * @class MessagesService
 */
@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  /**
   * Affiche un message
   * @param {string} msg Message à afficher
   * @param {number} duration Durée en millisecondes
   * @param {('warning' | 'danger' | 'success')} color Couleur du message
   * @param {*} [error] Error remontée
   * @example openSnackBar('test', 5000, 'danger', error) affiche une snackbar avec le message 'test' en rouge pendant 5 secondes
   * (error s'affiche dans les logs)
   * @memberof MessagesService
   */
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
