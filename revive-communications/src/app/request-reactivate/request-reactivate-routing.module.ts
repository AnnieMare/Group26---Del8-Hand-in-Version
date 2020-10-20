import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestReactivatePage } from './request-reactivate.page';

const routes: Routes = [
  {
    path: '',
    component: RequestReactivatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestReactivatePageRoutingModule {}
