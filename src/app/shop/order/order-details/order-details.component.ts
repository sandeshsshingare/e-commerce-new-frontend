import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../service/order.service';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  orderId: string = '';
  orderDetails: any;
  productInfo: any;
  isGetInvoice: boolean = false;
  constructor(
    private _activeRoute: ActivatedRoute,
    private router: Router,
    private _orderService: OrderService,
    private _shop: ShopService
  ) {
    this.orderId =
      this._activeRoute.snapshot.queryParamMap.get('orderId') || '';
    console.log(this.orderId);
    // this.createInvoice();
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
    this.router.navigate([`/shop/product/${productId}`]);
  }

  cancelOrder() {
    this._orderService.cancelOrder(this.orderId).subscribe({
      next: (data) => {
        this.router.navigate(['/shop/order/order-list']);
      },
    });
  }
  goToPayment() {
    this.router.navigate(['/shop/order/payment/' + this.orderId]);
  }

  getInvoice() {
    this.isGetInvoice = true;
    this._orderService.createInvoice(this.orderId).subscribe({
      next: (data) => {},
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
        setTimeout(() => {
          window.open('http://localhost:8080/invoice-pdf', '_blank');
          this.isGetInvoice = false;
        }, 2000);
      },
    });
  }
}
