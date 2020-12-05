import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {UrlRedirectComponent} from "./redirect/url-redirect/url-redirect.component";
import {UrlSecurity} from "./filter/url.security";

const routes: Routes = [
  {path: '', loadChildren: "./app-client/app-client.module#AppClientModule"},
  {
    path: 'admin', loadChildren: "./app-admin/app-admin.module#AppAdminModule",
    canActivate: [UrlSecurity], data: {roles: ["ADMIN"]}
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'oauth2/redirect', component: UrlRedirectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
