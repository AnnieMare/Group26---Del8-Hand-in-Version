import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewIndPosPage } from './view-ind-pos.page';

const routes: Routes = [
  {
    path: '',
    component: ViewIndPosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewIndPosPageRoutingModule {}
