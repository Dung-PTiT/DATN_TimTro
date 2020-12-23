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
import {MatTooltipModule} from "@angular/material/tooltip";
import { CommentComponent } from './comment/comment.component';
import { FavoriteComponent } from './favorite/favorite.component';
import {MatTableModule} from "@angular/material/table";
import { FavoriteDetailDialogComponent } from './favorite/favorite-detail-dialog/favorite-detail-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ButtonsModule, InputsModule} from "angular-bootstrap-md";
import {ReactiveFormsModule} from "@angular/forms";
import { TopUpComponent } from './top-up/top-up.component';
import { UserUpdateDialogComponent } from './user-update/user-update-dialog/user-update-dialog.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [UserUpdateComponent, ManagePostComponent, CommentComponent, FavoriteComponent, FavoriteDetailDialogComponent, TopUpComponent, UserUpdateDialogComponent],
  imports: [
    CommonModule,
    MatListModule,
    ManagePostModule,
    ManageActionRoutingModule,
    MatTabsModule,
    MatButtonModule,
    FontAwesomeModule,
    MatTooltipModule,
    MatTableModule,
    MatDialogModule,
    InputsModule,
    ReactiveFormsModule,
    MatRadioModule,
    ButtonsModule,
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class ManageActionModule {
}
