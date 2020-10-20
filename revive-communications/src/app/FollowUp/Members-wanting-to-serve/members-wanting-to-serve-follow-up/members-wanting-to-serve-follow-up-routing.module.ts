import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembersWantingToServeFollowUpPage } from './members-wanting-to-serve-follow-up.page';

const routes: Routes = [
  {
    path: '',
    component: MembersWantingToServeFollowUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembersWantingToServeFollowUpPageRoutingModule {}
