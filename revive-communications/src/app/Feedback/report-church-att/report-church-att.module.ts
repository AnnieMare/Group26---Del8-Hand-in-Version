import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportChurchAttPageRoutingModule } from './report-church-att-routing.module';

import { ReportChurchAttPage } from './report-church-att.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportChurchAttPageRoutingModule
  ],
  declarations: [ReportChurchAttPage]
})
export class ReportChurchAttPageModule {}
