import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendInvitationPage } from './send-invitation.page';

const routes: Routes = [
  {
    path: '',
    component: SendInvitationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendInvitationPageRoutingModule {}
