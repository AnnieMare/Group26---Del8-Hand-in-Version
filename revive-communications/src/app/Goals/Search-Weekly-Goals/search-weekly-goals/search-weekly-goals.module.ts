import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchWeeklyGoalsPageRoutingModule } from './search-weekly-goals-routing.module';

import { SearchWeeklyGoalsPage } from './search-weekly-goals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchWeeklyGoalsPageRoutingModule
  ],
  declarations: [SearchWeeklyGoalsPage]
})
export class SearchWeeklyGoalsPageModule {}
