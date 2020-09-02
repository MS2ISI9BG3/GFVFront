import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatButtonModule, MatCardModule, MatFormFieldModule, MatToolbarModule, MatInputModule, MatIconModule, MatListModule, MatSlideToggleModule, MatSidenavModule, MatSnackBarModule, MatDialogModule, MatSelectModule } from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    exports: [
      //Exporter ici les composants Angular Material pour qu'ils soient utilisable dans les autres composants
      MatProgressSpinnerModule,
      MatButtonModule,
      MatCardModule,
      MatFormFieldModule,
      MatToolbarModule,
      MatInputModule,
      MatIconModule,
      MatSidenavModule,
      MatListModule,
      MatSlideToggleModule,
      MatSnackBarModule,
      MatDialogModule,
      MatSelectModule,
      FormsModule
    ],
    providers: [
      //Configure Angular Material en français
      {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
      //Permet à Angular Material d'utiliser le format français par défaut pour les dates (dans le calendrier par exemple)
      {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
      {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
    ]
  })
  export class MaterialModule {}