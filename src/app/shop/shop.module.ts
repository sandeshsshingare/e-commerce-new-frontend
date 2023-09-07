import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { shopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop/shop.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SpecificProductComponent } from './specific-product/specific-product.component';

@NgModule({
  declarations: [ProductsComponent, ShopComponent, SpecificProductComponent],
  imports: [
    CommonModule,
    shopRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
  ],
})
export class ShopModule {}
