import { NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { shopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop/shop.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SpecificProductComponent } from './specific-product/specific-product.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NotificationComponent } from '../shared/notification/notification.component';
import { SharedModule } from '../shared/shared.module';
import { DiscountDirective } from '../shared/directives/discount.directive';
import { NgxStarRatingModule } from 'ngx-star-rating';

@NgModule({
  declarations: [ProductsComponent, ShopComponent, SpecificProductComponent],
  imports: [
    CommonModule,
    shopRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgxStarRatingModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      logOnly: !isDevMode(),
    }),
  ],
})
export class ShopModule {}
