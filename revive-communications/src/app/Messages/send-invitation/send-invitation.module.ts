import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendInvitationPageRoutingModule } from './send-invitation-routing.module';

import { SendInvitationPage } from './send-invitation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendInvitationPageRoutingModule
  ],
  declarations: [SendInvitationPage]
})
export class SendInvitationPageModule {}
