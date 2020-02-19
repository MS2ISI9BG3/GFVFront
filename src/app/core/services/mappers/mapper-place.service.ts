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
      Number(place.id),
      place.name,
      place.address,
      place.zipCode,
      place.city,
      place.phone,
      Boolean(place.isArchive)
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
      id: String(place.id),
      name: place.name,
      address: place.address,
      zipCode: place.zipCode,
      city: place.city,
      phone: place.phone,
      isArchive: String(place.isArchive)
    }
  }
}
