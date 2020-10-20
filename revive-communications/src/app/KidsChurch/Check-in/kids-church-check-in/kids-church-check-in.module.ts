import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KidsChurchCheckInPageRoutingModule } from './kids-church-check-in-routing.module';

import { KidsChurchCheckInPage } from './kids-church-check-in.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KidsChurchCheckInPageRoutingModule
  ],
  declarations: [KidsChurchCheckInPage]
})
export class KidsChurchCheckInPageModule {}
