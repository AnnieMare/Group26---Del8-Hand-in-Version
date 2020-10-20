import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateWeeklyGoalsPage } from './update-weekly-goals.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateWeeklyGoalsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateWeeklyGoalsPageRoutingModule {}
