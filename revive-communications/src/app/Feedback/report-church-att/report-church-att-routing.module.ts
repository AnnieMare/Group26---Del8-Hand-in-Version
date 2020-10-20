import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportChurchAttPage } from './report-church-att.page';

const routes: Routes = [
  {
    path: '',
    component: ReportChurchAttPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportChurchAttPageRoutingModule {}
