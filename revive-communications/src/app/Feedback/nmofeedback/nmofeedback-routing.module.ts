import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NMOFeedbackPage } from './nmofeedback.page';

const routes: Routes = [
  {
    path: '',
    component: NMOFeedbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NMOFeedbackPageRoutingModule {}
