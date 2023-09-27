import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { AuthModule } from '../auth/auth.module';
import { CompanyComponent } from './company/company.component';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ToastrModule } from 'ngx-toastr';
import { ProductsComponent } from './products/products.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SpecificProductComponent } from './specific-product/specific-product.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    ProfileComponent,
    CompanyComponent,
    UsersComponent,
    ChangePasswordComponent,
    ProductsComponent,
    SpecificProductComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,

    NgxChartsModule,
    AuthModule,
    FormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    SharedModule,
    NgxDropzoneModule,
    CKEditorModule,
    AngularEditorModule,
    // NoopAnimationPlayer,
  ],
})
export class SettingModule {}
