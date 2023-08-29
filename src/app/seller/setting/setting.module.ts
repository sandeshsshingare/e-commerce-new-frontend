import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { AuthModule } from '../auth/auth.module';
import { CompanyComponent } from './company/company.component';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [ProfileComponent, CompanyComponent, UsersComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    AuthModule,
    FormsModule,
    NgxPaginationModule,
  ],
})
export class SettingModule {}
