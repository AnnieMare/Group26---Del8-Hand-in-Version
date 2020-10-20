import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginUpdatedPage } from './login-updated.page';

const routes: Routes = [
  {
    path: '',
    component: LoginUpdatedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginUpdatedPageRoutingModule {}
