import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZoneGrowthPage } from './zone-growth.page';

const routes: Routes = [
  {
    path: '',
    component: ZoneGrowthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZoneGrowthPageRoutingModule {}
