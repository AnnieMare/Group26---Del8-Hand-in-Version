import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportHCAttPage } from './report-hcatt.page';

const routes: Routes = [
  {
    path: '',
    component: ReportHCAttPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportHCAttPageRoutingModule {}
