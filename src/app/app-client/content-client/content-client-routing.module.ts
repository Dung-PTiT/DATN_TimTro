import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardClientComponent} from "./dashboard-client/dashboard-client.component";
import {PostDetailsComponent} from "./post-details/post-details.component";

const routes: Routes = [
  {path: "", component: DashboardClientComponent},
  {path: "post/:id", component: PostDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentClientRoutingModule { }
