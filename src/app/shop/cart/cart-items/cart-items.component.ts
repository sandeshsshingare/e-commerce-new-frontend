import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { appState } from '../../store/app.state';
import { quantityChange, removeProduct } from '../../states/cart.action';
import { Router } from '@angular/router';
import { ShopSettingService } from '../../setting/services/shop-setting.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css'],
})
export class CartItemsComponent implements OnInit {
  cartData: any[] = [];
  subTotal: number = 0;
  orderTotal: number = 0;
  deliveryFee: number = 40;
  tax: number = 8.32;
  isCartEmpty: boolean = true;
  constructor(
    private store: Store<appState>,
    private _router: Router,
    private _shopSetting: ShopSettingService
  ) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    console.log('called');
    this.store.select('cart').subscribe({
      next: (data: any) => {
        this.cartData = data.cartItems;
        this.isCartEmpty = this.cartData.length === 0 ? true : false;
        console.log(this.cartData);
        this.calculateSubtotal();
      },
      error: (err) => {
        alert(err);
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
    this.store.dispatch(removeProduct({ productId: item.cartObj.productId }));
  }

  calculateSubtotal() {
    this.subTotal = 0;
    this.cartData.forEach((element) => {
      this.subTotal =
        this.subTotal + +element.cartObj.price * +element.cartObj.qty;
    });
    this.orderTotal = this.subTotal + this.deliveryFee + this.tax;
  }

  checkout() {
    console.log('called');
    let isLogin: boolean = false;
    this._shopSetting.profileData?.subscribe({
      next: (data) => {
        isLogin = data.isLogin;
      },
    });

    if (isLogin) {
      this._router.navigate(['/shop/order/checkout']);
    } else {
      this._router.navigate(['/shop/auth/sign-in'], {
        queryParams: { isCheckout: true },
      });
    }
  }
}
