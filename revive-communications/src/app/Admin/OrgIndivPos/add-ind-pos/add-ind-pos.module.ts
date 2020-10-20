import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddIndPosPageRoutingModule } from './add-ind-pos-routing.module';

import { AddIndPosPage } from './add-ind-pos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddIndPosPageRoutingModule
  ],
  declarations: [AddIndPosPage]
})
export class AddIndPosPageModule {}
