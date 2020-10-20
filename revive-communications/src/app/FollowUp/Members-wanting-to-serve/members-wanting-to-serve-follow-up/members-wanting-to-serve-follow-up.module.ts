import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MembersWantingToServeFollowUpPageRoutingModule } from './members-wanting-to-serve-follow-up-routing.module';

import { MembersWantingToServeFollowUpPage } from './members-wanting-to-serve-follow-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MembersWantingToServeFollowUpPageRoutingModule
  ],
  declarations: [MembersWantingToServeFollowUpPage]
})
export class MembersWantingToServeFollowUpPageModule {}
