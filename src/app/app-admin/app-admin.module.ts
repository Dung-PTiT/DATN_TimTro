import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppAdminRoutingModule } from './app-admin-routing.module';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';


@NgModule({
  declarations: [DashboardAdminComponent],
  imports: [
    CommonModule,
    AppAdminRoutingModule,
  ]
})
export class AppAdminModule { }
