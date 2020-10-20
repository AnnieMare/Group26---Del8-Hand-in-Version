import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZoneGrowthPageRoutingModule } from './zone-growth-routing.module';

import { ZoneGrowthPage } from './zone-growth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZoneGrowthPageRoutingModule
  ],
  declarations: [ZoneGrowthPage]
})
export class ZoneGrowthPageModule {}
