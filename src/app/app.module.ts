import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderAdminComponent} from './admin/header-admin/header-admin.component';
import {HeaderClientComponent} from './client/header-client/header-client.component';
import {FooterClientComponent} from './client/footer-client/footer-client.component';
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {ContentClientComponent} from './client/content-client/content-client.component';

import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {ExtendedModule} from "@angular/flex-layout";
import {FlexModule} from "@angular/flex-layout";
import {MatCarouselModule} from "@ngmodule/material-carousel";
import {
  BadgeModule,
  ButtonsModule,
  CarouselModule,
  CheckboxModule,
  DropdownModule,
  IconsModule,
  WavesModule
} from "angular-bootstrap-md";
import {MatDialogModule} from "@angular/material/dialog";
import {AppClientComponent} from './client/app-client/app-client.component';
import {LoginComponent} from "./client/header-client/login/login.component";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {RegisterComponent} from './client/header-client/register/register.component';
import {BodyContentClientComponent} from './client/content-client/body-content-client/body-content-client.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MenuContentClientComponent} from "./client/content-client/menu-content-client/menu-content-client.component";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatListModule} from "@angular/material/list";
import { UrlRedirectComponent } from './redirect/url-redirect/url-redirect.component';
import {AuthenticationService} from "./service/authentication.service";
import {CookieService} from "ngx-cookie-service";
import {JwtInterceptor} from "./filter/jwt.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HeaderAdminComponent,
    HeaderClientComponent,
    FooterClientComponent,
    ContentClientComponent,
    MenuContentClientComponent,
    AppClientComponent,
    LoginComponent,
    RegisterComponent,
    BodyContentClientComponent,
    UrlRedirectComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    ExtendedModule,
    FlexModule,
    MatCarouselModule,
    CarouselModule,
    WavesModule,
    MatDialogModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatFormFieldModule,
    CheckboxModule,
    IconsModule,
    ButtonsModule,
    FormsModule,
    FontAwesomeModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    DropdownModule,
    BadgeModule,
    MatSelectModule,
    NgbDropdownModule,
    HttpClientModule,
    MatTooltipModule,
    MatListModule
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
