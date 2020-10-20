import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginUpdatedPageRoutingModule } from './login-updated-routing.module';

import { LoginUpdatedPage } from './login-updated.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginUpdatedPageRoutingModule
  ],
  declarations: [LoginUpdatedPage]
})
export class LoginUpdatedPageModule {}
