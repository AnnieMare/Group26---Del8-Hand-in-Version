import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalvationFollowupPageRoutingModule } from './salvation-followup-routing.module';

import { SalvationFollowupPage } from './salvation-followup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalvationFollowupPageRoutingModule
  ],
  declarations: [SalvationFollowupPage]
})
export class SalvationFollowupPageModule {}
