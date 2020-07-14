import { Injectable } from '@angular/core';
import { iUser } from 'src/app/shared/models/dto-interfaces/iUser';
import { User } from 'src/app/shared/models/entities/user';
import { Token } from 'src/app/shared/models/entities/token';
import { IToken } from 'src/app/shared/models/dto-interfaces/iToken';

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
      user.login,
      user.password,
      user.firstName,
      user.lastName,
      user.authorities,
      user.token
    );
  }

  public mapToken(token: IToken): Token {
    return new Token(
      token.id_token
    );
  }
}
