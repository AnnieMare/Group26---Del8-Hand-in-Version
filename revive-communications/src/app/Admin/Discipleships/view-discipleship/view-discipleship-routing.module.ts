import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewDiscipleshipPage } from './view-discipleship.page';

const routes: Routes = [
  {
    path: '',
    component: ViewDiscipleshipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewDiscipleshipPageRoutingModule {}
