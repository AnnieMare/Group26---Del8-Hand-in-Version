import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomecellNotesPage } from './homecell-notes.page';

const routes: Routes = [
  {
    path: '',
    component: HomecellNotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomecellNotesPageRoutingModule {}
