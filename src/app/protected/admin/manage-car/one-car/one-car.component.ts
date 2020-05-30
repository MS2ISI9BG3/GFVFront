import { Component, OnInit } from '@angular/core';
import {Car} from "../../../../shared/models/entities/car";
import {ManagerCarService} from "../../manage-car/services/manager-car.service";
import {RestCarService} from "../../../../core/services/rest/rest-car.service";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

@Component({
  selector: 'app-one-car',
  templateUrl: './one-car.component.html',
  styleUrls: ['./one-car.component.scss']
})
export class OneCarComponent implements OnInit {


  /**
   * Liste de tous les lieux
   * @type {Car[]}
   * @memberof OneCarComponent
   */
  cars: Car[];
  /**
   * Lieu sélectionné pour affichage et modification
   * @type {Car}
   * @memberof OneCarComponent
   */
  car: Car;

  /**
   * Active ou non la modification d'un champ
   * @type {boolean}
   * @memberof OneCarComponent
   */
  showEditName: boolean = true;
  showEditMatricule: boolean = true;
  showEditPower: boolean = true;
  showEditPlaces: boolean = true;
  showEditOdometer: boolean = true;

  showEditInsuranceDate: boolean = true;
  showEditServiceDate: boolean = true;

  /**
   * Creates an instance of OneCarComponent.
   * @param {ManagerCarService} carService Service de gestion des lieux
   * @param {RestCarService} rest Service d'appel à l'API
   * @memberof OneCarComponent
   */
  constructor(
    private carService: ManagerCarService,
    private rest: RestCarService
  ) { }

  /**
   * Récupère les données des lieux au chargement du composant
   * @memberof OneCarComponent
   */
  ngOnInit() {
    this.carService.$carSelected
      .subscribe( carSelected =>
        this.car = carSelected
      );
    this.carService.$cars
      .subscribe( cars =>
        this.cars = cars
      );
  }

  /**
   * Activation ou non de la modification du champ nom du lieu
   * sur l'événement du clic sur son bouton de modification
   * @memberof OneCarComponent
   */
  onClickEditName(): void { this.showEditName = !this.showEditName; }
  /**
   * Activation ou non de la modification du champ adresse du lieu
   * sur l'événement du clic sur son bouton de modification
   * @memberof OneCarComponent
   */
  onClickEditMatricule(): void { this.showEditMatricule = !this.showEditMatricule; }
  /**
   * Activation ou non de la modification du champ code postal du lieu
   * sur l'événement du clic sur son bouton de modification
   * @memberof OneCarComponent
   */
  onClickEditPower(): void { this.showEditPower = !this.showEditPower; }
  /**
   * Activation ou non de la modification du champ ville du lieu
   * sur l'événement du clic sur son bouton de modification
   * @memberof OneCarComponent
   */
  onClickEditPlaces(): void { this.showEditPlaces = !this.showEditPlaces; }
  /**
   * Activation ou non de la modification du champ téléphone du lieu
   * sur l'événement du clic sur son bouton de modification
   * @memberof OneCarComponent
   */
  onClickEditOdometer(): void { this.showEditOdometer = !this.showEditOdometer; }
  /**
   * Activation ou non de la modification du champ téléphone du lieu
   * sur l'événement du clic sur son bouton de modification
   * @memberof OneCarComponent
   */
  onClickEditInsuranceDate(): void { this.showEditInsuranceDate = !this.showEditInsuranceDate; }

  /**
   * Activation ou non de la modification du champ téléphone du lieu
   * sur l'événement du clic sur son bouton de modification
   * @memberof OneCarComponent
   */
  onClickEditServiceDate(): void { this.showEditServiceDate = !this.showEditServiceDate; }


  /**
   * Modification du champ nom du lieu sur l'événement clic
   * @param {*} event
   * @memberof OneCarComponent
   */
  onKeyupEditName(event: any): void {
    this.car.name = event.target.value;
    this.updateCar();
  }

  /**
   * Modification du champ archive du lieu sur l'événement modifiant l'état du slider
   * @param {*} event
   * @memberof OneCarComponent
   */
  onChangeIsArchive(): void {
    this.car.isArchive = !this.car.isArchive;
    this.updateCar();
  }

  /**
   * Mise à jour du lieu en prennant en compte toutes les
   * modifications éffectuées dans les 1,5 secondes suivant
   * la première modification
   * @memberof OneCarComponent
   */
  updateCar() {
    this.rest.updateCar(this.car).pipe(
      debounceTime(1500),
      distinctUntilChanged()
    ).subscribe( car => {
      this.carService.changeCars(this.cars.map(p => p.id == car.id ? car : p));
    });
  }
}
