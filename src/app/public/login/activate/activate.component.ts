import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { MessagesService } from 'src/app/core/services/messages/messages.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessagesService
  ) { }

  ngOnInit() {
    this.activate();
  }

  activate(): void {
    this.activatedRoute.queryParams.subscribe( params => {
      let key: string = params['key'];
      if ( key ) {
        this.authenticationService.activateUser('').subscribe(
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
    })
    
  }

  navigateHome() {
    this.router.navigate(['public/login/login']);
  }

}
