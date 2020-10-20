import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateIndPosPage } from './update-ind-pos.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateIndPosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateIndPosPageRoutingModule {}
