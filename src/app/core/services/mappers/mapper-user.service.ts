import { Injectable } from '@angular/core';
import {IUser, iUser} from 'src/app/shared/models/dto-interfaces/iUser';
import { User } from 'src/app/shared/models/entities/user';
import { Token } from 'src/app/shared/models/entities/token';
import { IToken } from 'src/app/shared/models/dto-interfaces/iToken';
import {IPlace} from '../../../shared/models/dto-interfaces/iPlace';
import {Place} from '../../../shared/models/entities/place';

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

  /**
   * Transforme une interface de liste d'utilisateur en objet de liste d'utilisateur
   * @param {IUser[]} users
   * @returns {User[]}
   * @memberof MapperUserService
   */
  public mapUsers(users: IUser[]): User[] {
    return users.map(user => {
      return this.mapUser(user);
    });
  }

  public mapUser(user: iUser): User {
    if (!user) { return null; }
    return new User(
      Number(user.id),
      user.login,
      user.password,
      user.firstName,
      user.lastName,
      user.email,
      user.authorities,
      user.activated,
      user.archived,
      user.token,
      user.phoneNumber,
    );
  }

  /**
   * Transforme un objet user une interface user
   * @param {IUser} users
   * @returns {Place}
   * @memberof MapperUserService
   */
  mapIUser(user: User): IUser {
    return {
      id: String(user.id),
      login: user.login,
      password: user.login ,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      authorities: ["ROLE_USER", "ROLE_ADMIN"],
      activated : user.activated,
      archived : user.archived,
      phoneNumber: user.phoneNumber
    }
  }

  public mapToken(token: IToken): Token {
    return new Token(
      token.id_token
    );
  }
}
