import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManagePostRoutingModule} from './manage-post-routing.module';
import {PostCreateComponent} from './post-create/post-create.component';
import {MatDividerModule} from "@angular/material/divider";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatTabsModule} from "@angular/material/tabs";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {AgmCoreModule} from "@agm/core";
import {MatInputModule} from "@angular/material/input";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {PostListComponent} from './post-list/post-list.component';
import {MatTableModule} from "@angular/material/table";
import {CdkTableModule} from "@angular/cdk/table";
import {MatDialogModule} from '@angular/material/dialog';
import {PostUpdateComponent} from './post-update/post-update.component';
import {PostPushDialogComponent} from './post-push-dialog/post-push-dialog.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [PostCreateComponent, PostListComponent, PostUpdateComponent, PostPushDialogComponent],
  imports: [
    CommonModule,
    ManagePostRoutingModule,
    MatDividerModule,
    FontAwesomeModule,
    MatTabsModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgxMatSelectSearchModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCu8BQn5PRVzfQ6-_dgpUQRIqej_CTY2Qc'
    }),
    MatInputModule,
    CKEditorModule,
    FormsModule,
    MatTooltipModule,
    MatIconModule,
    CdkTableModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class ManagePostModule {
}
