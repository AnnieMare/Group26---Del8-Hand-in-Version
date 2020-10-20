import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetWeeklyGoalsPage } from './set-weekly-goals.page';

const routes: Routes = [
  {
    path: '',
    component: SetWeeklyGoalsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetWeeklyGoalsPageRoutingModule {}
