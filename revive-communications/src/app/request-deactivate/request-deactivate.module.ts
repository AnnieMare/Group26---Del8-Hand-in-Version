import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestDeactivatePageRoutingModule } from './request-deactivate-routing.module';

import { RequestDeactivatePage } from './request-deactivate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestDeactivatePageRoutingModule
  ],
  declarations: [RequestDeactivatePage]
})
export class RequestDeactivatePageModule {}
