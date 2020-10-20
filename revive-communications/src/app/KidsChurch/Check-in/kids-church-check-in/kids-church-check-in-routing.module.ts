import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KidsChurchCheckInPage } from './kids-church-check-in.page';

const routes: Routes = [
  {
    path: '',
    component: KidsChurchCheckInPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KidsChurchCheckInPageRoutingModule {}
