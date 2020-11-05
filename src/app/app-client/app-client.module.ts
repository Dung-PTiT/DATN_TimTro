import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppClientRoutingModule } from './app-client-routing.module';
import {AppClientComponent} from "./app-client.component";
import {HeaderClientComponent} from "./header-client/header-client.component";
import {FooterClientComponent} from "./footer-client/footer-client.component";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
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
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {HttpClientModule} from "@angular/common/http";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatListModule} from "@angular/material/list";
import {LoginComponent} from "../login/login.component";
import {RegisterComponent} from "../register/register.component";
import {ContentClientModule} from "./content-client/content-client.module";


@NgModule({
  declarations: [
    AppClientComponent,
    HeaderClientComponent,
    FooterClientComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    AppClientRoutingModule,
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
    MatListModule,
    ContentClientModule
  ]
})
export class AppClientModule { }
