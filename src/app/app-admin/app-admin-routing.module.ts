import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardAdminComponent} from "./dashboard-admin/dashboard-admin.component";

const routes: Routes = [
  {path: "", component: DashboardAdminComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppAdminRoutingModule {
}
