import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinOrgGroupPage } from './join-org-group.page';

const routes: Routes = [
  {
    path: '',
    component: JoinOrgGroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoinOrgGroupPageRoutingModule {}
