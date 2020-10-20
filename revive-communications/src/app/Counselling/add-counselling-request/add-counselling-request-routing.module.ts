import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCounsellingRequestPage } from './add-counselling-request.page';

const routes: Routes = [
  {
    path: '',
    component: AddCounsellingRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCounsellingRequestPageRoutingModule {}
