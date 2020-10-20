import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAnnouncementPage } from './view-announcement.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAnnouncementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAnnouncementPageRoutingModule {}
