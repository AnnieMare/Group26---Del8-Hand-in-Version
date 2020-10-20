import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberFollowUpPage } from './member-follow-up.page';

const routes: Routes = [
  {
    path: '',
    component: MemberFollowUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberFollowUpPageRoutingModule {}
