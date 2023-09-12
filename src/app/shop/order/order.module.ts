import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderComponent } from './order/order.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CheckoutComponent, PaymentComponent, OrderComponent],
  imports: [CommonModule, OrderRoutingModule, FormsModule],
})
export class OrderModule {}
