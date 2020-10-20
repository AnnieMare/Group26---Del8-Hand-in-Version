import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NMOFeedbackPageRoutingModule } from './nmofeedback-routing.module';

import { NMOFeedbackPage } from './nmofeedback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NMOFeedbackPageRoutingModule
  ],
  declarations: [NMOFeedbackPage]
})
export class NMOFeedbackPageModule {}
