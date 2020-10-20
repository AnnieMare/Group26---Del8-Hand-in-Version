import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaderFollowUpPage } from './leader-follow-up.page';

const routes: Routes = [
  {
    path: '',
    component: LeaderFollowUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaderFollowUpPageRoutingModule {}
