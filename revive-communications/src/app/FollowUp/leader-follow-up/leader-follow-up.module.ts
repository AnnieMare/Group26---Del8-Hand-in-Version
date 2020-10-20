import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeaderFollowUpPageRoutingModule } from './leader-follow-up-routing.module';

import { LeaderFollowUpPage } from './leader-follow-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaderFollowUpPageRoutingModule
  ],
  declarations: [LeaderFollowUpPage]
})
export class LeaderFollowUpPageModule {}
