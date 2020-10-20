import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalvationFormPage } from './salvation-form.page';

const routes: Routes = [
  {
    path: '',
    component: SalvationFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalvationFormPageRoutingModule {}
