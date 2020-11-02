import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppClientComponent} from "./client/app-client/app-client.component";
import {LoginComponent} from "./client/header-client/login/login.component";
import {RegisterComponent} from "./client/header-client/register/register.component";
import {UrlRedirectComponent} from "./redirect/url-redirect/url-redirect.component";

const routes: Routes = [
  {path: '', component: AppClientComponent},
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
