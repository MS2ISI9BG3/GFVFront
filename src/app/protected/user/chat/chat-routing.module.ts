import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from 'src/app/error/error-components/error/error.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'chat', component: ChatComponent },
    { path: '', redirectTo: '', pathMatch: 'chat' },
    { path: '**', component: ErrorComponent, data: { error: 404 } }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
