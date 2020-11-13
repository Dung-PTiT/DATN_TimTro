import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserUpdateComponent} from "./user-update/user-update.component";
import {ManagePostComponent} from "./manage-post/manage-post.component";

const routes: Routes = [
  {path: "user", component: UserUpdateComponent},
  {path: "post", component: ManagePostComponent, loadChildren: "./manage-post/manage-post.module#ManagePostModule"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageActionRoutingModule {
}
