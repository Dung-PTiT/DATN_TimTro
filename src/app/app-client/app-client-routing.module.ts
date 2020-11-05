import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppClientComponent} from "./app-client.component";

const routes: Routes = [
  {path: "", component: AppClientComponent,  loadChildren: "./content-client/content-client.module#ContentClientModule"},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppClientRoutingModule { }
