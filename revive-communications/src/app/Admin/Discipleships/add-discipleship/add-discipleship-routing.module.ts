import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDiscipleshipPage } from './add-discipleship.page';

const routes: Routes = [
  {
    path: '',
    component: AddDiscipleshipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDiscipleshipPageRoutingModule {}
