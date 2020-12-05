import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardClientComponent} from "./dashboard-client/dashboard-client.component";
import {PostDetailsComponent} from "./post-details/post-details.component";
import {ManageActionComponent} from "./manage-action/manage-action.component";
import {UrlSecurity} from "../../filter/url.security";
import {UserPageComponent} from "./user-page/user-page.component";

const routes: Routes = [
  {path: "", component: DashboardClientComponent},
  {path: "post/:id", component: PostDetailsComponent},
  {path: "user/:id", component: UserPageComponent},
  {
    path: "manage", component: ManageActionComponent,
    loadChildren: "./manage-action/manage-action.module#ManageActionModule",
    canActivate: [UrlSecurity], data: {roles: ["MEMBER", "ADMIN"]}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentClientRoutingModule {
}
