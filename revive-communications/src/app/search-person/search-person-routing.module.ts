import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPersonPage } from './search-person.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPersonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPersonPageRoutingModule {}
