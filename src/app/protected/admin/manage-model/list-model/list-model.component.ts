import { Component, OnInit } from '@angular/core';
import { Model } from 'src/app/shared/models/entities/model';
import { RestModelService } from 'src/app/core/services/rest/rest-model.service';
import { Router } from '@angular/router';
import { ModelsService } from 'src/app/core/services/datas/models.service';
import { MessagesService } from 'src/app/core/services/messages/messages.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { isArray, isString } from 'util';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-list-model',
  templateUrl: './list-model.component.html',
  styleUrls: ['./list-model.component.scss']
})
export class ListModelComponent implements OnInit {

  /**
   * Tableau contenant tous les modèles
   */
  models: Model[] = [];
  /**
   * Tableau contenant tous les modèles après application des filtres pour affichage
   */
  modelsFiltered: Model[] = [];

  public isMobile: boolean = true;

  constructor(
    private restModel: RestModelService,
    private router: Router,
    private modelsService: ModelsService,
    private messageService: MessagesService,
		private deviceDetector: DeviceDetectorService
  ) { }

  /**
   * Initialisation de la liste des lieux
   */
  ngOnInit() {
    this.isMobile = !this.deviceDetector.isDesktop();
    this.populateModelsFromApi();
  }

  /**
   * Récupération des modèles à afficher à partir de l'API
   */
  populateModelsFromApi() {
    this.restModel.getModels()
    .subscribe(models => {

      this.models = models;
      this.modelsFiltered = this.removeDeletedModels(models);
      this.modelsService.nextMOdels(models);
      this.populateModelsFromService();

    },error => {
      throw new Error(error)
    }), catchError( error => {
      this.messageService.openSnackBar('Erreur serveur', 5000, 'danger', error);
      return of([]);
    });
  }

  /**
   * Mise à jour de la liste des modèles à afficher
   */
  populateModelsFromService() {
    this.modelsService.models$.subscribe( models => {
      this.models = models;
      this.modelsFiltered = this.removeDeletedModels(models);
    });
  }

  /**
   * Supprime les modèles supprimés (état archivé) de la liste des modèles à afficher
   */
  removeDeletedModels(models: Model[]) {
    if ( models && isArray(models) ) return models.filter( m => !m.archived );
    return models;
  }

  /**
   * Gestion de l'évenement ajout d'une entrée dans la zone de recherche
   * Filtre la liste des modèles (minium 3 caractères à saisir dans le champ)
   */
  onInputSearch(event: any) {

    try {
      
      if ( !isString(event.toString()) ) throw new Error();

      const inputValue: string = event.trim().toLocaleLowerCase();

      if ( inputValue.length >= 3 ) {
        this.modelsFiltered = this.removeDeletedModels(this.models).filter( 
          model => model.modelName.toLocaleLowerCase().search(inputValue) > -1
        );
      } else {
        throw new Error();
      }

    } catch {
      this.modelsFiltered = this.removeDeletedModels(this.models);
    }

  }

  /**
   * Gestion de l'événèment clic sur un modèle de la liste des modèles
   */
  onClickModel(model: Model) {
    //L'id du modèle est passé en paramètre,
    //la page affichée sera donc en mode consultation d'un modèle
    this.router.navigate(['/protected/admin/manage-model/one-model'], {
      queryParams: { modelId: model.modelId }
   });
  }

  /**
   * Gestion de l'événement clic sur la boutton d'ajout d'un modèle
   */
  onClickAddModel() {
    //L'id du modèle n'est pas passé en paramètre,
    //la page affichée sera donc en mode création d'un nouveau modèle
    this.router.navigate(['/protected/admin/manage-model/one-model']);
  }

  /**
   * Gestion de l'événement clic sur la boutton fermer la fenêtre courante
   */
  onClickClose() {
    this.router.navigate(['/protected/admin']);
  }

}
