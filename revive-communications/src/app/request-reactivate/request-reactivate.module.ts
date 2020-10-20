import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestReactivatePageRoutingModule } from './request-reactivate-routing.module';

import { RequestReactivatePage } from './request-reactivate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestReactivatePageRoutingModule
  ],
  declarations: [RequestReactivatePage]
})
export class RequestReactivatePageModule {}
