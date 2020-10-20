import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewDiscipleshipPageRoutingModule } from './view-discipleship-routing.module';

import { ViewDiscipleshipPage } from './view-discipleship.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewDiscipleshipPageRoutingModule
  ],
  declarations: [ViewDiscipleshipPage]
})
export class ViewDiscipleshipPageModule {}
