import { NgModule } from '@angular/core';
import { ManageProfilRoutingModule } from './manage-profil-routing.module';
import { ManageProfilComponent } from './manage-profil/manage-profil.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ErrorModule } from 'src/app/error/error.module';


@NgModule({
  declarations: [ManageProfilComponent],
  imports: [
    SharedModule,
    ManageProfilRoutingModule,
    ErrorModule
  ]
})
export class ManageProfilModule { }
