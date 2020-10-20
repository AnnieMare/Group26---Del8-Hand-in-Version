import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterChildPageRoutingModule } from './register-child-routing.module';

import { RegisterChildPage } from './register-child.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterChildPageRoutingModule
  ],
  declarations: [RegisterChildPage]
})
export class RegisterChildPageModule {}
