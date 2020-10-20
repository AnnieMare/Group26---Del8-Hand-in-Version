import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscipleshipFollowupPageRoutingModule } from './discipleship-followup-routing.module';

import { DiscipleshipFollowupPage } from './discipleship-followup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscipleshipFollowupPageRoutingModule
  ],
  declarations: [DiscipleshipFollowupPage]
})
export class DiscipleshipFollowupPageModule {}
