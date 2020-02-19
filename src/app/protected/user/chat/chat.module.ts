import { NgModule } from '@angular/core';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat/chat.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ChatComponent],
  imports: [
    SharedModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
