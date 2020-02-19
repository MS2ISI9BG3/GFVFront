import { Injectable } from '@angular/core';
import { iUser } from 'src/app/shared/models/dto-interfaces/iUser';
import { User } from 'src/app/shared/models/entities/user';

/**
 * Classe gérant les transformations de type pour les utilisateurs
 * @export
 * @class MapperUserService
 */
@Injectable({
  providedIn: 'root'
})
export class MapperUserService {

  constructor() { }

  public mapUser(user: iUser): User {
    return new User(
      Number(user.id),
      user.username,
      user.password,
      user.firstName,
      user.lastName,
      user.token,
      Boolean(user.isAdmin)
    );
  }
}
