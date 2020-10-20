import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NmoFollowupPageRoutingModule } from './nmo-followup-routing.module';

import { NmoFollowupPage } from './nmo-followup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NmoFollowupPageRoutingModule
  ],
  declarations: [NmoFollowupPage]
})
export class NmoFollowupPageModule {}
