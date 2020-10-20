import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportDiscipleshipPageRoutingModule } from './report-discipleship-routing.module';

import { ReportDiscipleshipPage } from './report-discipleship.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportDiscipleshipPageRoutingModule
  ],
  declarations: [ReportDiscipleshipPage]
})
export class ReportDiscipleshipPageModule {}
