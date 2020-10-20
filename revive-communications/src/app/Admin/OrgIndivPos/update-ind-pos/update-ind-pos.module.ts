import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateIndPosPageRoutingModule } from './update-ind-pos-routing.module';

import { UpdateIndPosPage } from './update-ind-pos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateIndPosPageRoutingModule
  ],
  declarations: [UpdateIndPosPage]
})
export class UpdateIndPosPageModule {}
