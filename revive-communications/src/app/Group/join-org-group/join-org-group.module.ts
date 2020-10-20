import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinOrgGroupPageRoutingModule } from './join-org-group-routing.module';

import { JoinOrgGroupPage } from './join-org-group.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinOrgGroupPageRoutingModule
  ],
  declarations: [JoinOrgGroupPage]
})
export class JoinOrgGroupPageModule {}
