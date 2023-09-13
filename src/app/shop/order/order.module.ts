import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderComponent } from './order/order.component';
import { FormsModule } from '@angular/forms';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    CheckoutComponent,
    PaymentComponent,
    OrderComponent,
    OrderListComponent,
    OrderDetailsComponent,
  ],
  imports: [CommonModule, OrderRoutingModule, FormsModule, NgxPaginationModule],
})
export class OrderModule {}
