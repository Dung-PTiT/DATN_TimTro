import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TagComponent} from "./tag/tag.component";
import {ContentAdminComponent} from "./content-admin.component";
import {DashboardAdminComponent} from "./dashboard-admin/dashboard-admin.component";
import {CategoryComponent} from "./category/category.component";
import {Favorite} from "../../model/favorite";
import {PaymentComponent} from "./payment/payment.component";
import {PostComponent} from "./post/post.component";
import {PostVipComponent} from "./post-vip/post-vip.component";
import {UserComponent} from "./user/user.component";
import {CommentComponent} from "./comment/comment.component";

const routes: Routes = [
  {
    path: "",
    component: ContentAdminComponent,
    children: [
      {path: "", component: DashboardAdminComponent},
      {path: "category", component: CategoryComponent},
      {path: "favorite", component: Favorite},
      {path: "payment", component: PaymentComponent},
      {path: "post", component: PostComponent},
      {path: "post-vip", component: PostVipComponent},
      {path: "tag", component: TagComponent},
      {path: "user", component: UserComponent},
      {path: "comment", component: CommentComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentAdminRoutingModule {
}
