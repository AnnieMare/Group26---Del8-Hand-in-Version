import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverviewStructurePage } from './overview-structure.page';

const routes: Routes = [
  {
    path: '',
    component: OverviewStructurePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OverviewStructurePageRoutingModule {}
