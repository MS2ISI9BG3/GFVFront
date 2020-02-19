import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { extendMoment } from 'moment-range';

//Gère les intervalles de dates
const MOMENT_RANGE = extendMoment(moment);

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  //Variables publiques utilisés dans le fichier .html
  today: moment.Moment;

  dateStart: moment.Moment;
  dateEnd: moment.Moment;

  isRangeContainToday: boolean;

  labelLoading: string;
  isLoading: boolean = true;

  constructor() { }

  //Fonction appelée à 'initialisation du composant
  //La classe implémente l'interface OnInit
  ngOnInit() {
    this.today = moment();
    this.dateStart = moment().subtract(3, 'day'); //Aujourd'hui + 3 jours
    this.dateEnd = moment().add(3, 'day'); //Ajourd'hui - 3 jours
    this.isRangeContainToday = this.isTodayInRange(this.dateStart, this.dateEnd, this.today);

    //Init label for button loading
    this.labelLoading = this.updateLabelLoading(true);
  }

  private isTodayInRange(dateStart: moment.Moment, dateEnd: moment.Moment, yesterday: moment.Moment): boolean {
    //Fonction privée : voir commentaire ci-dessous dans la fonction updateLabelLoading(isLoading)
    let rangeMoment = MOMENT_RANGE.range(dateStart, dateEnd);
    return rangeMoment.contains(yesterday);
  }

  onClickLoading() {
    this.isLoading = !this.isLoading;
    this.labelLoading = this.updateLabelLoading(this.isLoading);
  }

  private updateLabelLoading(isLoading: boolean): string {
    //Fonction privée : à mettre dans un service métier au niveau du composant courant 'show-ride' (dans un dossier 'services/')
    //Sinon, si la fonction doit être réutiliser dans d'autres modules, créer un service dans le core module
    return isLoading ? this.labelLoading = 'Arrêter le chargement' : 'Lancer le chargement';
  }

  public getDurationDay(dateStart, dateEnd): number {
    return moment.duration(dateEnd.diff(dateStart)).days();
  }

}
