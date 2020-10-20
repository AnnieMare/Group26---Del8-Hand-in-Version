import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePersonPageRoutingModule } from './update-person-routing.module';

import { UpdatePersonPage } from './update-person.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePersonPageRoutingModule
  ],
  declarations: [UpdatePersonPage]
})
export class UpdatePersonPageModule {}
