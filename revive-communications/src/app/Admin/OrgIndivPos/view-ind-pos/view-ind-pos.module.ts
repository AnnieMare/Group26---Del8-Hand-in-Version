import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewIndPosPageRoutingModule } from './view-ind-pos-routing.module';

import { ViewIndPosPage } from './view-ind-pos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewIndPosPageRoutingModule
  ],
  declarations: [ViewIndPosPage]
})
export class ViewIndPosPageModule {}
