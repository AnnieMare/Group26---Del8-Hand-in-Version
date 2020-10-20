import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAnnouncementPageRoutingModule } from './view-announcement-routing.module';

import { ViewAnnouncementPage } from './view-announcement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAnnouncementPageRoutingModule
  ],
  declarations: [ViewAnnouncementPage]
})
export class ViewAnnouncementPageModule {}
