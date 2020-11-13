import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManageActionRoutingModule} from './manage-action-routing.module';
import {MatListModule} from "@angular/material/list";
import {UserUpdateComponent} from './user-update/user-update.component';
import {ManagePostComponent} from './manage-post/manage-post.component';
import {ManagePostModule} from "./manage-post/manage-post.module";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [UserUpdateComponent, ManagePostComponent],
  imports: [
    CommonModule,
    MatListModule,
    ManagePostModule,
    ManageActionRoutingModule,
    MatTabsModule,
    MatButtonModule,
    FontAwesomeModule
  ]
})
export class ManageActionModule {
}
