import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardClientComponent} from "./dashboard-client/dashboard-client.component";
import {PostDetailsComponent} from "./post-details/post-details.component";
import {ManageActionComponent} from "./manage-action/manage-action.component";

const routes: Routes = [
  {path: "", component: DashboardClientComponent},
  {path: "post/:id", component: PostDetailsComponent},
  {path: "manage", component: ManageActionComponent, loadChildren: "./manage-action/manage-action.module#ManageActionModule"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentClientRoutingModule { }
