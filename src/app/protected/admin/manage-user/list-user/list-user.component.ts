import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/entities/user';
import { Router } from '@angular/router';
import {MessagesService} from '../../../../core/services/messages/messages.service';
import {RestUserService} from '../../../../core/services/rest/rest-user.service';
import {catchError} from 'rxjs/operators';
import { isArray, isString } from 'util';
import {of} from 'rxjs';
import {UsersService} from '../../../../core/services/datas/users.service';
import {Place} from '../../../../shared/models/entities/place';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  ngOnInit() {
    this.populateUsersFromApi();
  }

  /**
   * Tableau contenant tous les utilisateurs
   * @type {User[]}
   * @memberof ListUserComponent
   */
  users: User[] = [];

  /**
   * Tableau contenant tous les utilisateurs après application des filtres pour affichage
   * @type {User[]}
   * @memberof ListUserComponent
   */
  usersFiltered: User[] = [];

  constructor(
    private restUser: RestUserService,
    private router: Router,
    private usersService: UsersService,
    private messageService: MessagesService
  ) {}

  /**
   * Récupération des utilisateurs à afficher à partir de l'API
   * @param {User} place Un utilisateur
   * @memberof ListUserComponent
   */
  populateUsersFromApi() {
    this.restUser.getUsers()
      .subscribe(users => {

        this.users = users;
        this.usersFiltered = this.removeDeletedUsers(users);
        this.usersService.nextUsers(users);
        this.populateUsersFromService();

      },error => {
        throw new Error(error)
      }), catchError( error => {
      this.messageService.openSnackBar('Erreur serveur', 5000, 'danger', error);
      console.error(error);
      return of([]);
    });
  }

  /**
   * Mise à jour de la liste des utilisateurs à afficher
   * @param {User} place Un utilisateur
   * @memberof ListUserComponent
   */
  populateUsersFromService() {
    this.usersService.users$.subscribe( users => {
      this.users = users;
      this.usersFiltered = this.removeDeletedUsers(users);
    });

    this.usersFiltered.sort( (u1, u2) =>
      (u1.firstName+u1.lastName).toLocaleLowerCase() > (u2.firstName+u2.lastName).toLocaleLowerCase() ? 1 :
        (u1.firstName+u1.lastName).toLocaleLowerCase() < (u2.firstName+u2.lastName).toLocaleLowerCase() ? -1 :
          0
    );

  }

  /**
   * Supprime les utilisateurs supprimés (état archivé) de la liste des utilisateurs à afficher
   * @param {User} place Un utilisateur
   * @memberof ListUserComponent
   */
  removeDeletedUsers(users: User[]) {
    if ( users && isArray(users) ) return users.filter( p => !p.archived );
    return users;
  }

  /**
   * Gestion de l'évenement ajout d'une entrée dans la zone de recherche
   * Filtre la liste des utilisateurs (minium 3 caractères à saisir dans le champ)
   * @param {User} place Un utilisateur
   * @memberof ListUserComponent
   */
  onInputSearch(event: any) {

    try {

      if (!isString(event.toString())) throw new Error();

      const inputValue: string = event.trim().toLocaleLowerCase();

      if ( inputValue.length >= 3 ) {
        this.usersFiltered = this.removeDeletedUsers(this.users).filter(
          user => (user.firstName.toLocaleLowerCase().search(inputValue) > -1 || user.lastName.toLocaleLowerCase().search(inputValue) > -1 )
        );
      } else {
        throw new Error();
      }

    } catch {
      this.usersFiltered = this.removeDeletedUsers(this.users);
    }

  }

  /**
   * Gestion de l'événèment clic sur un utilisateur de la liste des utilisateurs
   * @param {User} place Un utilisateur
   * @memberof ListUserComponent
   */
  onClickUser(user: User) {
    //L'id de l'utilisateur est passé en paramètre,
    //la page affichée sera donc en mode consultation d'un utilisateur
    this.router.navigate(['/protected/admin/manage-user/one-user'], {
      queryParams: { id: user.login }
    });
  }

  /**
   * Gestion de l'événement clic sur la boutton fermer la fenêtre courante
   * @memberof ListUserComponent
   */
  onClickClose() {
    this.router.navigate(['/protected/admin']);
  }

  /**
   * Gestion de l'événement clic sur la boutton d'ajout d'un lieu
   * @memberof ListUserComponent
   */
  onClickAddUser() {
    //L'id du user n'est pas passé en paramètre,
    //la page affichée sera donc en mode création d'un nouveau user
    this.router.navigate(['/protected/admin/manage-user/one-user']);
  }

}
