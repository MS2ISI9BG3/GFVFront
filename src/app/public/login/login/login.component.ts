import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { first } from 'rxjs/operators';
import { RestUserService } from 'src/app/core/services/rest/rest-user.service';
import { FakeRestUserService } from 'src/app/core/services/rest/fake-rest-user.service';
import { Token } from 'src/app/shared/models/entities/token';
import { MessagesService } from 'src/app/core/services/messages/messages.service';

/**
 * Connexion à l'application
 * @export
 * @class LoginComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**
   * Formulaire de connexion à l'application
   * @type {FormGroup}
   * @memberof LoginComponent
   */
  loginForm: FormGroup;
  /**
   * Est en train de charger la page?
   * @memberof LoginComponent
   */
  loading = false;
  /**
   * Le formulaire de connexion a été validé?
   * @memberof LoginComponent
   */
  submitted = false;
  /**
   * Libellé de l'URL de redirection après une authentification réussie
   * @type {string}
   * @memberof LoginComponent
   */
  returnUrl: string;

  /**
   * Creates an instance of LoginComponent.
   * @param {FormBuilder} formBuilder
   * @param {ActivatedRoute} route
   * @param {Router} router
   * @param {AuthenticationService} authenticationService
   * @memberof LoginComponent
   */
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private messageService: MessagesService
    /*private restUser: RestUserService,*/
    //private fakeRestUser: FakeRestUserService
  ) {}

  /**
   * Initalisation du formulaire de connexion
   * @memberof LoginComponent
   */
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    //this.authenticationService.logout(); TODO
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  /**
   * Renvoie les controles des champs du formulaire
   * @readonly
   * @memberof LoginComponent
   */
  get f() { return this.loginForm.controls; }

  /**
   * Gère la validation du formulaire de connexion
   * @returns
   * @memberof LoginComponent
   */
  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      //this.authenticationService.login(this.f.username.value, this.f.password.value) TODO
      this.authenticationService.login(this.f.username.value, this.f.password.value)
          .pipe(first())
          .subscribe(
            (token: Token) => {
                //Hydrate l'utilisateur dans le service authentification
                this.authenticationService.getUser(token.idToken).subscribe( () => {
                  let url: string = this.returnUrl;
                  if (url == '/') {
                    url = '/protected';
                  }
                  this.router.navigate([url]);
                },
                error => {
                  //this.error = "Erreur lors de la récupération des informations de l'utilisateur";
                  this.messageService.openSnackBar('Erreur lors de la récupération des informations de l\'utilisateur', 5000, 'danger', error);
                  this.loading = false;
                });
            },
            error => {
              //this.error = "Login ou mot de passe incorrect";
              this.messageService.openSnackBar('Login ou mot de passe incorrect', 5000, 'danger');
              this.loading = false;
            });
  }

}
