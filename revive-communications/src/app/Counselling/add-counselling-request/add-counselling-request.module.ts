import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCounsellingRequestPageRoutingModule } from './add-counselling-request-routing.module';

import { AddCounsellingRequestPage } from './add-counselling-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCounsellingRequestPageRoutingModule
  ],
  declarations: [AddCounsellingRequestPage]
})
export class AddCounsellingRequestPageModule {}
