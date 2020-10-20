import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StructureGrowthFeedbackPageRoutingModule } from './structure-growth-feedback-routing.module';

import { StructureGrowthFeedbackPage } from './structure-growth-feedback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StructureGrowthFeedbackPageRoutingModule
  ],
  declarations: [StructureGrowthFeedbackPage]
})
export class StructureGrowthFeedbackPageModule {}
