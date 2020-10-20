import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateDiscipleshipPageRoutingModule } from './update-discipleship-routing.module';

import { UpdateDiscipleshipPage } from './update-discipleship.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateDiscipleshipPageRoutingModule
  ],
  declarations: [UpdateDiscipleshipPage]
})
export class UpdateDiscipleshipPageModule {}
