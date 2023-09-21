import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order-services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent {
  orderId: string = '';
  orderDetails: any;
  productInfo: any;
  isGetInvoice: boolean = false;
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
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
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
