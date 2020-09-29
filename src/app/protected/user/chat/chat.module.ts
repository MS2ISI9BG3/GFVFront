import { NgModule } from '@angular/core';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat/chat.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ErrorModule } from 'src/app/error/error.module';


@NgModule({
  declarations: [ChatComponent],
  imports: [
    SharedModule,
    ChatRoutingModule,
    ErrorModule
  ]
})
export class ChatModule { }
