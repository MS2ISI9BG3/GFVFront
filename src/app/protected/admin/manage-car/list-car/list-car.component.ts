import { Component, OnInit } from '@angular/core';
import {Car} from "../../../../shared/models/entities/car";
import {RestCarService} from "../../../../core/services/rest/rest-car.service";
import {Router} from "@angular/router";
import {ManagerCarService} from "../../manage-car/services/manager-car.service";

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
   * Creates an instance of ListCarComponent.
   * @param {RestCarService} restCar Service appel à l'API Rest
   * @param {Router} router Angular Router
   * @param {ManagerCarService} carService Service gérant les lieux
   * @memberof ListCarComponent
   */
  constructor(
    private restCar: RestCarService,
    private router: Router,
    private carService: ManagerCarService
  ) { }

  /**
   * Initialisation de la liste des lieux
   * @memberof ListCarComponent
   */
  ngOnInit() {
    this.restCar.getCars()
      .subscribe(cars => {
        this.cars = cars;
        this.carService.changeCars(cars);
      });
    this.carService.$cars
      .subscribe(cars =>
        this.cars = cars
      );
  }

  /**
   * Gestion de l'événèment clic sur un lieu de la liste des lieux
   * @param {Car} car Un lieu
   * @memberof ListCarComponent
   */
  onClickCar(car: Car) {
    this.carService.changeCarSelected(car);
    this.router.navigate(['/protected/admin/manage-car/one-car']);
  }

  /**
   * Gestion de l'événement clic sur la corbeille d'un lieu
   * @param {Car} car Un lieu
   * @memberof ListCarComponent
   */
  onClickDelete(car: Car) {
    this.restCar.deleteCar(car).subscribe( p =>
      this.carService.changeCars(this.cars.splice(this.cars.findIndex(p => p.id == car.id), 1))
    );
  }


}
