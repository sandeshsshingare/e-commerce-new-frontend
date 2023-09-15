import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SellerComponent } from './seller/seller/seller.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CKEditorModule } from 'ng2-ckeditor';
import {
  RECAPTCHA_V3_SITE_KEY,
  ReCaptchaV3Service,
  RecaptchaV3Module,
} from 'ng-recaptcha';

@NgModule({
  declarations: [AppComponent, SellerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AngularEditorModule,
    CKEditorModule,
    RecaptchaV3Module,
  ],
  providers: [
    ReCaptchaV3Service,
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6Lcf-CgoAAAAACXm8OMiAI0C6e_OxKZA_0zcIOcl',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
