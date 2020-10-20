import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchWeeklyGoalsPage } from './search-weekly-goals.page';

const routes: Routes = [
  {
    path: '',
    component: SearchWeeklyGoalsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchWeeklyGoalsPageRoutingModule {}
