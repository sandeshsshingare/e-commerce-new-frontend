import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { ShopSettingService } from '../../setting/services/shop-setting.service';
import { appState } from '../../store/app.state';
import { quantityChange, removeProduct } from '../../states/cart.action';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit, OnChanges {
  ordersData: any[] = [];
  subTotal: number = 0;
  tax: number = 8.32;
  deliveryFee: number = 40;
  orderTotal: number = 0;
  addresses: any;
  isPaymentRoute: boolean = false;
  addressId: any;
  constructor(
    private store: Store<appState>,
    private _shopSetting: ShopSettingService,
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private _orderService: OrderService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {}

  isPaymentCheck() {
    console.log('or route change called');
    if (this._router.url.toString().includes('payment')) {
      this.isPaymentRoute = true;
    } else {
      this.isPaymentRoute = false;
    }
  }

  ngOnInit(): void {
    this.getOrders();
    console.log();
    if (this._router.url.toString().includes('payment')) {
      this.isPaymentRoute = true;
    } else {
      this.isPaymentRoute = false;
    }
    this.getAddresses();
    this._activeRoute.queryParamMap.subscribe({
      next: (data: any) => {
        console.log(data);
        if (data.params.addressId) {
          this.addressId = data.params.addressId;
        } else {
          this.addressId = '';
        }
        if (data.params.isStandard) {
          this.deliveryFee = parseInt(data.params.isStandard);
          console.log(this.deliveryFee);
          this.calculateSubtotal();
        } else {
          this.deliveryFee = 40;
        }
      },
    });
  }

  getAddresses() {
    this._shopSetting.getAllAddress().subscribe({
      next: (data: any) => {
        this.addresses = data.results;
      },
    });
  }

  getOrders() {
    this.store.select('cart').subscribe({
      next: (data) => {
        this.ordersData = data.cartItems;
        if (this.ordersData.length === 0) {
          this._router.navigate(['/shop']);
        }
        console.log(this.ordersData);
        this.calculateSubtotal();
      },
    });
  }

  quantityChangeFun(item: any, qty: any) {
    let qty1 = Number(qty);
    console.log(item);
    this.store.dispatch(
      quantityChange({ productId: item.cartObj.productId, quantity: qty1 })
    );

    // this.getCartItems();
  }

  removeFromCart(item: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Removed!', 'Your file has been removed.', 'success');
        this.store.dispatch(
          removeProduct({ productId: item.cartObj.productId })
        );
      }
    });
  }

  calculateSubtotal() {
    this.subTotal = 0;
    this.ordersData.forEach((element) => {
      this.subTotal =
        this.subTotal + +element.cartObj.price * +element.cartObj.qty;
    });
    this.orderTotal = this.subTotal + this.deliveryFee + this.tax;
  }

  checkoutForPayment() {
    let address: any;
    this.addresses.forEach((ele: any) => {
      if (ele._id === this.addressId) {
        let obj = {
          street: ele['street'],
          addressLine2: ele['addressLine2'],
          city: ele['city'],
          state: ele['state'],
          pin: ele['pin'],
        };
        address = obj;
      }
    });

    console.log(this.ordersData);
    let arr: any[] = [];
    for (let item of this.ordersData) {
      let obj1 = {
        productId: item.cartObj.productId,

        name: item.cartObj.name,
        price: item.cartObj.price,
        qty: item.cartObj.qty,
        subTotal: item.cartObj.subTotal,
      };
      arr.push(obj1);
    }

    console.log(arr);

    let obj = {
      items: arr,

      deliveryFee: this.deliveryFee,
      total: this.orderTotal,
      address: address,
    };
    console.log(obj);
    this._orderService.placeOrder(obj).subscribe({
      next: (data: any) => {
        console.log(data);
        this._router.navigate([`/shop/order/payment/${data.result._id}`]);
      },
    });
  }
}
