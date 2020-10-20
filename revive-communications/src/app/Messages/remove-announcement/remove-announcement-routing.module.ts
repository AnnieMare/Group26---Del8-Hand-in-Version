import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemoveAnnouncementPage } from './remove-announcement.page';

const routes: Routes = [
  {
    path: '',
    component: RemoveAnnouncementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemoveAnnouncementPageRoutingModule {}
