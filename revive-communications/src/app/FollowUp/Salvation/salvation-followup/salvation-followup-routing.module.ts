import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalvationFollowupPage } from './salvation-followup.page';

const routes: Routes = [
  {
    path: '',
    component: SalvationFollowupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalvationFollowupPageRoutingModule {}
