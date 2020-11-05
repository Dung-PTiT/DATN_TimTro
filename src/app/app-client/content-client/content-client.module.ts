import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentClientRoutingModule } from './content-client-routing.module';
import {ContentClientComponent} from "./content-client.component";
import {DashboardClientComponent} from "./dashboard-client/dashboard-client.component";
import {CarouselModule} from "angular-bootstrap-md";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";
import { PostDetailsComponent } from './post-details/post-details.component';


@NgModule({
  declarations: [
    ContentClientComponent,
    DashboardClientComponent,
    PostDetailsComponent
  ],
  imports: [
    CommonModule,
    ContentClientRoutingModule,
    CarouselModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatTooltipModule,
    FontAwesomeModule,
    MatSelectModule,
    MatListModule
  ]
})
export class ContentClientModule { }
