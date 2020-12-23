import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContentClientRoutingModule} from './content-client-routing.module';
import {ContentClientComponent} from "./content-client.component";
import {DashboardClientComponent} from "./dashboard-client/dashboard-client.component";
import {ButtonsModule, CarouselModule, InputsModule, WavesModule} from "angular-bootstrap-md";
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
import {PostDetailsComponent} from './post-details/post-details.component';
import {AgmCoreModule} from "@agm/core";
import {MatCarouselModule} from "@ngmodule/material-carousel";
import {AgmDirectionModule} from "agm-direction";
import { UserPageComponent } from './user-page/user-page.component';
import {MatTableModule} from "@angular/material/table";
import { ServicePriceComponent } from './service-price/service-price.component';
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  declarations: [
    ContentClientComponent,
    DashboardClientComponent,
    PostDetailsComponent,
    UserPageComponent,
    ServicePriceComponent
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
    MatListModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCu8BQn5PRVzfQ6-_dgpUQRIqej_CTY2Qc',
      // ,
      // language: 'vn',
      // libraries: ['geometry', 'places']
    }),
    WavesModule,
    MatCarouselModule,
    ButtonsModule,
    AgmDirectionModule,
    InputsModule,
    MatTableModule,
    NgxMatSelectSearchModule,
    NgxPaginationModule
  ]
})
export class ContentClientModule {
}
