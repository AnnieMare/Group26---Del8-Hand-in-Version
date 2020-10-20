import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportDiscipleshipPage } from './report-discipleship.page';

const routes: Routes = [
  {
    path: '',
    component: ReportDiscipleshipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportDiscipleshipPageRoutingModule {}
