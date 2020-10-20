import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QRKidschurchPage } from './qrkidschurch.page';

const routes: Routes = [
  {
    path: '',
    component: QRKidschurchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QRKidschurchPageRoutingModule {}
