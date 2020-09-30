import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './dependencies/material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FormatAddressPipe } from './pipes/format-address.pipe';
import { BtnCloseDirective } from './directives/btn-close.directive';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { FirstLetterCasePipe } from './pipes/first-letter-case.pipe';
import { FormatDateFrPipe } from './pipes/format-date-fr.pipe';

/**
 * Centralise l'importation des composants, des directives et des pipes partagés par différents modules de l'application
 * Rassemble les importations récurrentes d'autres modules tel que le CommonModule ou le FormModule
 * Est importé dans tous les autres modules de l'application
 * @export
 * @class SharedModule
 */
@NgModule({
  declarations: [
    FormatAddressPipe,
    FirstLetterCasePipe,
    BtnCloseDirective,
    ConfirmDialogComponent,
    FormatDateFrPipe
  ],
  imports: [ //? TODO Check import is useless here
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    //HttpClientModule //TODO à supprimer, httpClient ne doit être utiliser que dans les services rest qui se trouve dans le core-module
    FormatAddressPipe,
    FirstLetterCasePipe,
    FormatDateFrPipe
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
