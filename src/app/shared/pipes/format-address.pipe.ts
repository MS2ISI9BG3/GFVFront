import { Pipe, PipeTransform } from '@angular/core';
import { Place } from '../models/entities/place';

/**
 * Pipe gérant le formatage des adresses
 * @example {numéro de rue}, {nom de rue}, {code postal} {ville}
 * @export
 * @class FormatAddressPipe
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'formatAddress'
})
export class FormatAddressPipe implements PipeTransform {

  /**
   * Met en forme l'adresse complète d'un lieu:
   * adresse (numéro et nom de rue), code postal et ville
   * @param {Place} place
   * @returns {*}
   * @memberof FormatAddressPipe
   */
  transform(place: Place): any {
    if (place.address && place.zipCode && place.city) {
      return `${place.address.trim()}, ${place.zipCode} ${place.city}`;
    }
    return null;
  }

}
