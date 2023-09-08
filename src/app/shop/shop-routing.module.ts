import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ShopComponent } from './shop/shop.component';
import { SpecificProductComponent } from './specific-product/specific-product.component';
import { shopAuthGuard } from './guards/shop-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    children: [
      {
        path: '',
        component: ProductsComponent,
      },
      {
        path: 'product/:productId',
        component: SpecificProductComponent,
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'setting',
        canActivate: [shopAuthGuard],
        loadChildren: () =>
          import('./setting/setting.module').then((m) => m.SettingModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class shopRoutingModule {}
