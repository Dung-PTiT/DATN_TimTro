import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContentAdminRoutingModule} from './content-admin-routing.module';
import {DashboardAdminComponent} from './dashboard-admin/dashboard-admin.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TagComponent} from './tag/tag.component';
import {UserComponent} from './user/user.component';
import {PostComponent} from './post/post.component';
import {CategoryComponent} from './category/category.component';
import {PostVipComponent} from './post-vip/post-vip.component';
import {CommentComponent} from './comment/comment.component';
import {PaymentComponent} from './payment/payment.component';
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDividerModule} from "@angular/material/divider";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ButtonsModule, IconsModule, InputsModule} from "angular-bootstrap-md";
import {TagCreateDialogComponent} from './tag/tag-create-dialog/tag-create-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";
import {TagUpdateDialogComponent} from './tag/tag-update-dialog/tag-update-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {CategoryCreateDialogComponent} from './category/category-create-dialog/category-create-dialog.component';
import {CategoryUpdateDialogComponent} from './category/category-update-dialog/category-update-dialog.component';
import {PostVipUpdateDialogComponent} from './post-vip/post-vip-update-dialog/post-vip-update-dialog.component';
import {UserCreateDialogComponent} from './user/user-create-dialog/user-create-dialog.component';
import {MatCardModule} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";
import {UserUpdateDialogComponent} from './user/user-update-dialog/user-update-dialog.component';
import {MatRadioModule} from "@angular/material/radio";
import {WalletComponent} from './wallet/wallet.component';
import {UserPageComponent} from './user/user-page/user-page.component';
import {TopUpDialogComponent} from './wallet/top-up-dialog/top-up-dialog.component';
import {TopUpHistoryDialogComponent} from './wallet/top-up-history-dialog/top-up-history-dialog.component';


@NgModule({
  declarations: [DashboardAdminComponent, TagComponent, UserComponent, PostComponent, CategoryComponent, PostVipComponent, CommentComponent, PaymentComponent, TagCreateDialogComponent, TagUpdateDialogComponent, CategoryCreateDialogComponent, CategoryUpdateDialogComponent, PostVipUpdateDialogComponent, UserCreateDialogComponent, UserUpdateDialogComponent, WalletComponent, UserPageComponent, TopUpDialogComponent, TopUpHistoryDialogComponent],
  imports: [
    CommonModule,
    ContentAdminRoutingModule,
    FontAwesomeModule,
    MatTableModule,
    MatTooltipModule,
    MatDividerModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    IconsModule,
    InputsModule,
    ReactiveFormsModule,
    MatDialogModule,
    ButtonsModule,
    MatCardModule,
    MatSelectModule,
    MatRadioModule
  ]
})
export class ContentAdminModule {
}
