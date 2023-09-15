import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrderListComponent, OrderDetailsComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    NgxPaginationModule,
    FormsModule,
  ],
})
export class OrdersModule {}
