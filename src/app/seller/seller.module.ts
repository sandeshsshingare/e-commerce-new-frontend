import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerRoutingModule } from './seller-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { authGuard } from './guards/auth.guard';

@NgModule({
  declarations: [],
  providers: [],
  imports: [
    CommonModule,
    SellerRoutingModule,
    HttpClientModule,
    FormsModule,
    AuthModule,
  ]
})
export class SellerModule {}
