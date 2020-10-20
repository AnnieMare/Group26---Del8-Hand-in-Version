import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateWeeklyGoalsPageRoutingModule } from './update-weekly-goals-routing.module';

import { UpdateWeeklyGoalsPage } from './update-weekly-goals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateWeeklyGoalsPageRoutingModule
  ],
  declarations: [UpdateWeeklyGoalsPage]
})
export class UpdateWeeklyGoalsPageModule {}
