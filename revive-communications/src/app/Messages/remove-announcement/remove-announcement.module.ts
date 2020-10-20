import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemoveAnnouncementPageRoutingModule } from './remove-announcement-routing.module';

import { RemoveAnnouncementPage } from './remove-announcement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemoveAnnouncementPageRoutingModule
  ],
  declarations: [RemoveAnnouncementPage]
})
export class RemoveAnnouncementPageModule {}
