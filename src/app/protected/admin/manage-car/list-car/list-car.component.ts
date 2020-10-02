import {Component, OnInit} from '@angular/core';
import {Car} from "../../../../shared/models/entities/car";
import {RestCarService} from "../../../../core/services/rest/rest-car.service";
import {Router} from "@angular/router";
import {ManagerCarService} from "../../manage-car/services/manager-car.service";
import {isArray, isString} from "util";
import {Place} from "../../../../shared/models/entities/place";
import {MessagesService} from "../../../../core/services/messages/messages.service";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-list-car',
  templateUrl: './list-car.component.html',
  styleUrls: ['./list-car.component.scss']
})
export class ListCarComponent implements OnInit {

  /**
   * Tableau contenant tous les lieux non archivés
   * @type {Car[]}
   * @memberof ListCarComponent
   */
  cars: Car[] = [];

  /**
   * Tableau contenant tous les lieux après application des filtres pour affichage
   * @type {Place[]}
   * @memberof ListPlaceComponent
   */
  carsFiltered: Car[] = [];

  public isMobile: boolean = true;

  /**
   * Creates an instance of ListCarComponent.
   * @param {RestCarService} restCar Service appel à l'API Rest
   * @param {Router} router Angular Router
   * @param {ManagerCarService} carService Service gérant les lieux
   * @memberof ListCarComponent
   */
  constructor(
    private restCar: RestCarService,
    private router: Router,
    private carService: ManagerCarService,
    private messageService: MessagesService,
		private deviceDetector: DeviceDetectorService
  ) {
  }

  /**
   * Initialisation de la liste des lieux
   * @memberof ListCarComponent
   */
  ngOnInit() {
    this.isMobile = !this.deviceDetector.isDesktop();
    this.populateCarsFromApi();
  }

  populateCarsFromApi() {
    this.restCar.getCars()
      .subscribe(cars => {

        this.cars = cars;
        this.carsFiltered = this.removeDeletedCars(cars);;
        this.carService.nextCars(cars);
        // this.populateCarsFromService();

      }, error => {
        throw new Error(error)
      }), catchError(error => {
      this.messageService.openSnackBar('Erreur serveur', 5000, 'danger', error);
      console.error(error);
      return of([]);
    });
  }

  populateCarsFromService() {
    this.carService.$cars.subscribe(cars => {
      this.cars = cars;
      this.carsFiltered = cars;
    });
  }

  /**
   * Gestion de l'événèment clic sur un lieu de la liste des lieux
   * @param {Car} car Un lieu
   * @memberof ListCarComponent
   */
  onClickCar(car: Car) {
    this.carService.changeCarSelected(car);
    this.router.navigate(['/protected/admin/manage-car/one-car'], {
      queryParams: {carId: car.carId}
    });
  }


  /**
   * Supprime les sites supprimés (état archivé) de la liste des lieux à afficher
   * @param {Place} place Un lieu
   * @memberof ListPlaceComponent
   */
  removeDeletedCars(cars: Car[]) {
    if (cars && isArray(cars)) return cars.filter(p => !p.archived);
    return cars;
  }


  /**
   * Gestion de l'évenement ajout d'une entrée dans la zone de recherche
   * Filtre la liste des sites (minium 3 caractères à saisir dans le champ)
   * @param {Place} place Un lieu
   * @memberof ListPlaceComponent
   */
  onInputSearch(event: any) {

    try {

      if (!isString(event.toString())) throw new Error();

      const inputValue: string = event.trim().toLocaleLowerCase();

      if (inputValue.length >= 3) {
        this.carsFiltered = this.cars.filter(
          car => (car.matricule.toLocaleLowerCase().search(inputValue) > -1)
        );
      } else {
        throw new Error();
      }

    } catch {
      this.carsFiltered = this.removeDeletedCars(this.cars);
    }

  }


  /**
   * Gestion de l'événement clic sur la boutton d'ajout d'un lieu
   * @memberof ListPlaceComponent
   */
  onClickAddCar() {
    //L'id du site n'est pas passé en paramètre,
    //la page affichée sera donc en mode création d'un nouveau site
    this.router.navigate(['/protected/admin/manage-car/one-car']);
  }

  /**
   * Gestion de l'événement clic sur la boutton fermer la fenêtre courante
   * @memberof ListPlaceComponent
   */
  onClickClose() {
    this.router.navigate(['/protected/admin']);
  }


}
