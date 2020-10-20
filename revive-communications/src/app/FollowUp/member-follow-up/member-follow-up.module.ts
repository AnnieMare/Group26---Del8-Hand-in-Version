import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemberFollowUpPageRoutingModule } from './member-follow-up-routing.module';

import { MemberFollowUpPage } from './member-follow-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MemberFollowUpPageRoutingModule
  ],
  declarations: [MemberFollowUpPage]
})
export class MemberFollowUpPageModule {}
