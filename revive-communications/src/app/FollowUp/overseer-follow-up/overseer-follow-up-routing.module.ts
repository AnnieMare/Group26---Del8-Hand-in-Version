import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverseerFollowUpPage } from './overseer-follow-up.page';

const routes: Routes = [
  {
    path: '',
    component: OverseerFollowUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OverseerFollowUpPageRoutingModule {}
