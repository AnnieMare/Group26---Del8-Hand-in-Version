import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPersonPageRoutingModule } from './search-person-routing.module';

import { SearchPersonPage } from './search-person.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPersonPageRoutingModule
  ],
  declarations: [SearchPersonPage]
})
export class SearchPersonPageModule {}
