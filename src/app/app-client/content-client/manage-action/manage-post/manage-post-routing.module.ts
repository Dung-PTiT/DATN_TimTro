import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ManagePostComponent} from "./manage-post.component";
import {PostCreateComponent} from "./post-create/post-create.component";

const routes: Routes = [
  {path: "", component: ManagePostComponent},
  {path: "create", component: PostCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagePostRoutingModule {
}
