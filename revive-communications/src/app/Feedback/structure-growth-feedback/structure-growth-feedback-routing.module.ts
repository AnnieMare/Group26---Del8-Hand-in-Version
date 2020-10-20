import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StructureGrowthFeedbackPage } from './structure-growth-feedback.page';

const routes: Routes = [
  {
    path: '',
    component: StructureGrowthFeedbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StructureGrowthFeedbackPageRoutingModule {}
