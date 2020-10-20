import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QRKidschurchPageRoutingModule } from './qrkidschurch-routing.module';

import { QRKidschurchPage } from './qrkidschurch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRKidschurchPageRoutingModule
  ],
  declarations: [QRKidschurchPage]
})
export class QRKidschurchPageModule {}
