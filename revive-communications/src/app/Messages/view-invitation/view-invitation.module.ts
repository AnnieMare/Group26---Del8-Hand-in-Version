import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewInvitationPageRoutingModule } from './view-invitation-routing.module';

import { ViewInvitationPage } from './view-invitation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewInvitationPageRoutingModule
  ],
  declarations: [ViewInvitationPage]
})
export class ViewInvitationPageModule {}
