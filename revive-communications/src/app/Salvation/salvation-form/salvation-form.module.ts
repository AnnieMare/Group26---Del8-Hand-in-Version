import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalvationFormPageRoutingModule } from './salvation-form-routing.module';

import { SalvationFormPage } from './salvation-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalvationFormPageRoutingModule
  ],
  declarations: [SalvationFormPage]
})
export class SalvationFormPageModule {}
