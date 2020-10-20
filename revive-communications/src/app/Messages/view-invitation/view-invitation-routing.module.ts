import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewInvitationPage } from './view-invitation.page';

const routes: Routes = [
  {
    path: '',
    component: ViewInvitationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewInvitationPageRoutingModule {}
