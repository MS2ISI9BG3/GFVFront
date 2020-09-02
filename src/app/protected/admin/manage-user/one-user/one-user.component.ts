import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormMode} from '../../../../shared/enums/formMode';
import {ActivatedRoute, Router} from '@angular/router';
import {MessagesService} from '../../../../core/services/messages/messages.service';
import {MatDialog} from '@angular/material';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {ConfirmDialogComponent} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import {UsersService} from '../../../../core/services/datas/users.service';
import {RestUserService} from '../../../../core/services/rest/rest-user.service';
import {User} from '../../../../shared/models/entities/user';

@Component({
  selector: 'app-one-user',
  templateUrl: './one-user.component.html',
  styleUrls: ['./one-user.component.scss']
})
export class OneUserComponent implements OnInit {

  /**
   * Gère les valeurs des champs du formulaire ainsi que leur validité
   * @type {FormGroup}
   * @memberof OneUserComponent
   */
  public userForm: FormGroup;
  public user: User;
  public queryUserId: string = null; // Null: add place, id: show and update place
  public isToUpdate: boolean = false;
  public formMode: FormMode = FormMode.show;

  /**
   * Creates an instance of AddPlaceComponent.
   * Initialise les validateurs des champs du formulaire
   * @param {FormBuilder} formBuilder Form builder
   * @param {RestUserService} restUser Service exposant les utilisateurs aux autres composants du module
   * @memberof OneUserComponent
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private restUser: RestUserService,
    private usersService: UsersService,
    private messagesService: MessagesService,
    public dialog: MatDialog
  ) {
    this.userForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  /**
   * Actions à l'initialisation du formulaire
   * @readonly
   * @memberof OneUserComponent
   */
  ngOnInit() {
    this.userForm.reset();
    this.populateQueryParams();
    //Si un id a été passé en paramètre de la route,
    //le composant est en mode affichage d'un utilisateur (ou modification si l'utilisateur clic sur le bouton edit)
    //Si pas d'id, mode création d'un nouvel utilisateur
    this.queryUserId ? this.showAndUpdateUser(this.queryUserId) : this.createUser();
  }

  /**
   * Initialisation du mode affichage et mise à jour d'un utilisateur
   * @readonly
   * @memberof OneUserComponent
   */
  showAndUpdateUser(queryUserId: string) {
    this.populateUser(queryUserId);
  }

  /**
   * Initialisation du mode création d'un nouveau site
   * @readonly
   * @memberof OneUserComponent
   */
  createUser() {
    this.formMode = FormMode.create;
    this.updateDefaultFormValue(this.formMode);
  }

  /**
   * Récupération des données de l'utilisateur pour affichage
   * @readonly
   * @memberof OneUserComponent
   */
  populateUser(queryUserId: string) {
    this.restUser.getUser(queryUserId)
      .subscribe( user => {
          this.user = user;
          this.updateDefaultFormValue(FormMode.show, user);
        },
        ( error => {
          throw new Error(error)
        })), catchError( (error: any) => {
      this.messagesService.openSnackBar('Une erreur interne est survenue', 5000, 'danger', error);
      return of([]);
    });
  }

  /**
   * Mise à jour des valeurs du formulaire de l'utilisateur
   * Mode création: champs vides
   * Mode affichage et mise à jour: champs préremplis avec les valeurs de l'utilisateur
   * @readonly
   * @memberof OneUserComponent
   */
  updateDefaultFormValue(formMode: FormMode, user?: User) {
    console.log('user: '+JSON.stringify(user));
    if ( (formMode == FormMode.show || formMode == FormMode.update) && user ) {
      this.f.firstName.setValue(user.firstName);
      this.f.lastName.setValue(user.lastName);
      this.f.login.setValue(user.login);
    } else {
      this.f.firstName.setValue('');
      this.f.lastName.setValue('');
      this.f.login.setValue('');
    }

  }

  /**
   * Récupération de l'id de l'utilisateur passé en paramètre de la route
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  populateQueryParams() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryUserId = params['id'] ? params['id'] : null;
      console.log('queryPlaceId: '+this.queryUserId);
    });
  }

  // convenience getter for easy access to form fields
  /**
   * Renvoie les controles des champs du formulaire
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  get f() { return this.userForm.controls; }

  get firstNameFormControl() { return this.userForm.get('firstName') }
  get lastNameFormControl() { return this.userForm.get('lastName') }
  get loginFormControl() { return this.userForm.get('login') }

  /**
   * Gestion du clic sur le bouton d'action
   * Permet de valide la création d'un utilisateur,
   * la mise à jour d'un site et son affichage static
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  onClickBtnUser(formMode: FormMode) {
    if (formMode == FormMode.create) { this.addUser(); this.formMode = FormMode.show; return };
    if (formMode == FormMode.show) { this.formMode = FormMode.update; return };
    if (formMode == FormMode.update) { this.updateUser(); this.formMode = FormMode.show; return };
  }

  /**
   * Gestion du clic sur le bouton suppression
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  onClickDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "250px",
      data: {
        title: "Confirmer",
        msg: "L'utilisateur " + this.user.firstName + " " + this.user.lastName +" va être supprimé"}
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log('dialogResult: '+dialogResult);
      if ( dialogResult ) this.updateUser(true);
    });
  }

  /**
   * Validation et enregistrement éventuel des valeurs du formulaire d'ajout d'un lieu
   * @returns
   * @memberof AddPlaceComponent
   */
  addUser() {

  }

  /**
   * Validation et modification des valeurs du formulaire d'ajout d'un lieu
   * @returns
   * @memberof AddPlaceComponent
   */
  updateUser(isDeleted: boolean = false) {

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

    try {

      let user = this.user;
      user.firstName = this.userForm.value.firstName;
      user.lastName = this.userForm.value.lastName;
      user.login = this.userForm.value.login;
      //if ( isDeleted ) place.archived = true;

      this.restUser.updateUser(user).subscribe(user => {

        this.user = user;
        this.usersService.nextUserUpdated(user);

        let msg: string = isDeleted ? 'Suppression' : 'Modification';
        this.messagesService.openSnackBar(msg+' de lutilisateur '+user.firstName + " " + user.lastName +' enregistrée', 5000, 'success');

        if ( isDeleted ) this.onClickClose();

      }, error => {
        this.messagesService.openSnackBar('Erreur serveur', 5000, 'danger', error);
      });

    } catch (error) {
      this.messagesService.openSnackBar('Une erreur est survenue lors de la création du site', 5000, 'danger', error);
    }

  }

  /**
   * Gestion du clic sur le bouton fermer
   * Renvoie l'utilisateur à la liste des sites
   * @readonly
   * @memberof AddFamilyFormComponent
   */
  onClickClose() {
    this.router.navigate(['/protected/admin/manage-user/manage-user']);
  }

}
