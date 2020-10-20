import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateDiscipleshipPage } from './update-discipleship.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateDiscipleshipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateDiscipleshipPageRoutingModule {}
