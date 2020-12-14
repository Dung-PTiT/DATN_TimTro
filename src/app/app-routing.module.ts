import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {UrlRedirectComponent} from "./redirect/url-redirect/url-redirect.component";
import {EmailVerifyComponent} from "./email-verify/email-verify.component";

const routes: Routes = [
  {path: '', loadChildren: "./app-client/app-client.module#AppClientModule"},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'oauth2/redirect', component: UrlRedirectComponent},
  {path: 'email-verify', component: EmailVerifyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
