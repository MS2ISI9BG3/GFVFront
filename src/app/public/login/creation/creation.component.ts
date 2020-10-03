import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../core/services/authentication/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessagesService} from '../../../core/services/messages/messages.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestUserService} from '../../../core/services/rest/rest-user.service';
import {UsersService} from '../../../core/services/datas/users.service';
import {MatDialog} from '@angular/material';
import {FormMode} from '../../../shared/enums/formMode';
import {log} from 'util';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})
export class CreationComponent implements OnInit {

  public passwordForm: FormGroup;
  public formMode: FormMode = FormMode.create;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessagesService
  ) {
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmation: ['', [Validators.required, Validators.minLength(4)]]
    });
  }


  ngOnInit() {
    this.passwordForm.reset();
  }

  /**
   * Renvoie les controles des champs du formulaire
   * @readonly
   * @memberof CreationComponent
   */
  get f() { return this.passwordForm.controls; }

  get passwordFormControl() { return this.passwordForm.get('password'); }
  get confirmationFormControl() { return this.passwordForm.get('confirmation'); }

  /**
   * Gestion du clic sur le bouton d'action
   * Permet de valide la création du mot de passe,
   * @readonly
   * @memberof CreationComponent
   */
  onClickBtnPassword(formMode: FormMode) {
    if (formMode == FormMode.create) {this.activation(); return;}
  }


  /**
   * Active et enregistre le mot de passe de l'utilisateur
   * @returns
   * @memberof CreationComponent
   */
  activation() {
    // stop here if form is invalid
    if (this.passwordForm.invalid) {
      return;
    }

    if(this.passwordForm.value.password != this.passwordForm.value.confirmation)
    {
      this.messageService.openSnackBar('Les mots de passes ne sont pas identiques.', 5000, 'danger');
      return;
    }

    this.activatedRoute.queryParams.subscribe( params => {
      let key: string = params['key'];
      if ( key ) {
        this.authenticationService.resetPassword(key, this.passwordForm.value.password).subscribe(
          ( res: boolean ) => {
            if ( res ) {
              this.messageService.openSnackBar('Compte activé', 5000, 'success');
            } else {
              this.messageService.openSnackBar('Une erreur est survenue lors de l\'activation du compte', 5000, 'danger');
            }
            this.navigateHome();
          }
        ), error => {
          this.messageService.openSnackBar('Une erreur est survenue lors de l\'activation du compte', 5000, 'danger', error);
          this.navigateHome();
        };
      } else {
        this.messageService.openSnackBar('La clé de validation du compte est incorrect', 5000, 'danger');
        this.navigateHome();
      }
    });

  }

  navigateHome() {
    this.router.navigate(['public/login/login']);
  }


}
