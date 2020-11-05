import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {UrlRedirectComponent } from './redirect/url-redirect/url-redirect.component';
import {AuthenticationService} from "./service/authentication.service";
import {CookieService} from "ngx-cookie-service";
import {JwtInterceptor} from "./filter/jwt.interceptor";
import {AppClientModule} from "./app-client/app-client.module";

@NgModule({
  declarations: [
    AppComponent,
    UrlRedirectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthenticationService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
