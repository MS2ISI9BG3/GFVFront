import { Injectable } from '@angular/core';
import { IPlace } from 'src/app/shared/models/dto-interfaces/iPlace';
import { Place } from 'src/app/shared/models/entities/place';

/**
 * Class gérant les transformation de type pour les lieux
 * @export
 * @class MapperPlaceService
 */
@Injectable({
  providedIn: 'root'
})
export class MapperPlaceService {

  /**
   * Transforme une interface de liste de lieu en objet de liste de lieu
   * @param {IPlace[]} places
   * @returns {Place[]}
   * @memberof MapperPlaceService
   */
  public mapPlaces(places: IPlace[]): Place[] {
    return places.map(place => {
      return this.mapPlace(place);
    });
  }

  /**
   * Transforme une interface lieu en objet lieu
   * @param {IPlace[]} places
   * @returns {Place[]}
   * @memberof MapperPlaceService
   */
  public mapPlace(place: IPlace): Place {
    return new Place(
      Number(place.siteId),
      place.siteName,
      place.siteAddress,
      place.sitePhoneNumber,
      Boolean(place.archived)
    );
  }

  /**
   * Transforme un objet lieu une interface lieu
   * @param {IPlace[]} places
   * @returns {Place[]}
   * @memberof MapperPlaceService
   */
  mapIPlace(place: Place): IPlace {
    return {
      siteId: String(place.siteId),
      siteName: place.siteName,
      siteAddress: place.siteAddress,
      sitePhoneNumber: place.sitePhoneNumber,
      archived: String(place.archived)
    }
  }
}
