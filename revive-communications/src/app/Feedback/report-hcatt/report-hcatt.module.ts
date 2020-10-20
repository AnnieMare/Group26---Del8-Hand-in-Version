import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportHCAttPageRoutingModule } from './report-hcatt-routing.module';

import { ReportHCAttPage } from './report-hcatt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportHCAttPageRoutingModule
  ],
  declarations: [ReportHCAttPage]
})
export class ReportHCAttPageModule {}
