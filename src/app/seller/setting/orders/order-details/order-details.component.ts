import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order-services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent {
  orderId: string = '';
  orderDetails: any;
  productInfo: any;
  constructor(
    private _activeRoute: ActivatedRoute,
    private router: Router,
    private _orderService: OrderService
  ) {
    this.orderId =
      this._activeRoute.snapshot.queryParamMap.get('orderId') || '';
    console.log(this.orderId);
  }
  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails() {
    this._orderService.getSpecificOrder(this.orderId).subscribe({
      next: (data: any) => {
        this.orderDetails = data.results;

        console.log(this.orderDetails);
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }
  itemClicked(productId: any) {
    this.router.navigate([`/setting/specific-product/${productId}`]);
  }
  orderAction(action: string) {
    this._orderService.actionOnOrder(this.orderId, action).subscribe({
      next: (data) => {
        this.getOrderDetails();
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }
}
