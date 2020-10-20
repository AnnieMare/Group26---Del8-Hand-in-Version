import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddIndPosPage } from './add-ind-pos.page';

const routes: Routes = [
  {
    path: '',
    component: AddIndPosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddIndPosPageRoutingModule {}
