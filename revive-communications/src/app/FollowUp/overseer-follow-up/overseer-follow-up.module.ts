import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OverseerFollowUpPageRoutingModule } from './overseer-follow-up-routing.module';

import { OverseerFollowUpPage } from './overseer-follow-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OverseerFollowUpPageRoutingModule
  ],
  declarations: [OverseerFollowUpPage]
})
export class OverseerFollowUpPageModule {}
