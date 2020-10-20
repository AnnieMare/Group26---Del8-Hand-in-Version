import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDiscipleshipPageRoutingModule } from './add-discipleship-routing.module';

import { AddDiscipleshipPage } from './add-discipleship.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDiscipleshipPageRoutingModule
  ],
  declarations: [AddDiscipleshipPage]
})
export class AddDiscipleshipPageModule {}
