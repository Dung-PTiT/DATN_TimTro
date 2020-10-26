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
import {MenuContentClientComponent} from './client/content-client/menu-content-client/menu-content-client.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {ExtendedModule} from "@angular/flex-layout";
import {FlexModule} from "@angular/flex-layout";
import {MatCarouselModule} from "@ngmodule/material-carousel";
import {ButtonsModule, CarouselModule, CheckboxModule, IconsModule, WavesModule} from "angular-bootstrap-md";
import {MatDialogModule} from "@angular/material/dialog";
import { AppClientComponent } from './client/app-client/app-client.component';
import {LoginComponent} from "./client/header-client/login/login.component";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatFormFieldModule} from "@angular/material/form-field";
import { RegisterComponent } from './client/header-client/register/register.component';

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
    RegisterComponent
  ],
  imports: [
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
    ButtonsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
