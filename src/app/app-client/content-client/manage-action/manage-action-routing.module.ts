import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserUpdateComponent} from "./user-update/user-update.component";
import {ManagePostComponent} from "./manage-post/manage-post.component";
import {CommentComponent} from "./comment/comment.component";
import {FavoriteComponent} from "./favorite/favorite.component";
import {TopUpComponent} from "./top-up/top-up.component";

const routes: Routes = [
  {
    path: "user", component: UserUpdateComponent
  },
  {
    path: "post", component: ManagePostComponent,
    loadChildren: "./manage-post/manage-post.module#ManagePostModule"
  },
  {
    path: "comment", component: CommentComponent
  },
  {
    path: "favorite", component: FavoriteComponent
  },
  {
    path: "top-up", component: TopUpComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageActionRoutingModule {
}
