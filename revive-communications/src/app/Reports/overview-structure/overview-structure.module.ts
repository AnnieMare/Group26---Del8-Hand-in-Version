import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OverviewStructurePageRoutingModule } from './overview-structure-routing.module';

import { OverviewStructurePage } from './overview-structure.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OverviewStructurePageRoutingModule
  ],
  declarations: [OverviewStructurePage]
})
export class OverviewStructurePageModule {}
