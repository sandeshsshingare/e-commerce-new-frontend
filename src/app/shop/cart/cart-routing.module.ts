import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartItemsComponent } from './cart-items/cart-items.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cart-items',
    pathMatch: 'full',
  },
  {
    path: 'cart-items',
    component: CartItemsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
