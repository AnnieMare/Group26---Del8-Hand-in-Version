import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestDeactivatePage } from './request-deactivate.page';

const routes: Routes = [
  {
    path: '',
    component: RequestDeactivatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestDeactivatePageRoutingModule {}
