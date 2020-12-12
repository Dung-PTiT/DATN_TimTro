import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppClientComponent} from "./app-client.component";
import {UrlSecurity} from "../filter/url.security";

const routes: Routes = [
  {
    path: "",
    component: AppClientComponent,
    loadChildren: "./content-client/content-client.module#ContentClientModule"
  },
  {
    path: "admin",
    component: AppClientComponent,
    loadChildren: "./content-admin/content-admin.module#ContentAdminModule",
    canActivate: [UrlSecurity], data: {roles: ["ADMIN"]}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppClientRoutingModule {
}
