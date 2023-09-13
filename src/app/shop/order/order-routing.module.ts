import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderComponent } from './order/order.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
  {
    path: '',

    component: OrderComponent,
    children: [
      {
        path: '',
        redirectTo: 'checkout',
        pathMatch: 'full',
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
      },
      {
        path: 'payment/:orderId',
        component: PaymentComponent,
      },
    ],
  },
  {
    path: 'order-list',
    component: OrderListComponent,
  },
  {
    path: 'order-details',
    component: OrderDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
