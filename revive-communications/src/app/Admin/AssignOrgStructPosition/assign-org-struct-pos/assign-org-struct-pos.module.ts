import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignOrgStructPosPageRoutingModule } from './assign-org-struct-pos-routing.module';

import { AssignOrgStructPosPage } from './assign-org-struct-pos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignOrgStructPosPageRoutingModule
  ],
  declarations: [AssignOrgStructPosPage]
})
export class AssignOrgStructPosPageModule {}
