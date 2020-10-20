import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetWeeklyGoalsPageRoutingModule } from './set-weekly-goals-routing.module';

import { SetWeeklyGoalsPage } from './set-weekly-goals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetWeeklyGoalsPageRoutingModule
  ],
  declarations: [SetWeeklyGoalsPage]
})
export class SetWeeklyGoalsPageModule {}
