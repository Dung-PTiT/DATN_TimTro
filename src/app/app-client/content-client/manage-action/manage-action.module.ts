import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageActionRoutingModule } from './manage-action-routing.module';
import {MatListModule} from "@angular/material/list";
import { UserUpdateComponent } from './user-update/user-update.component';


@NgModule({
  declarations: [UserUpdateComponent],
  imports: [
    CommonModule,
    MatListModule,
    ManageActionRoutingModule
  ]
})
export class ManageActionModule { }
