import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomecellNotesPageRoutingModule } from './homecell-notes-routing.module';

import { HomecellNotesPage } from './homecell-notes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomecellNotesPageRoutingModule
  ],
  declarations: [HomecellNotesPage]
})
export class HomecellNotesPageModule {}
