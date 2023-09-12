import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { appState } from '../store/app.state';
import { addProduct } from '../states/cart.action';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  allProducts: any[] = [];
  currentHover: any;
  allController = {
    page: 1,
    limit: 5,
    search: '',
    sort: '',
  };
  totalResults: any;

  constructor(
    private _shop: ShopService,
    private _router: Router,
    private store: Store<appState>
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this._shop.getAllProducts().subscribe({
      next: (data: any) => {
        this.allProducts = data.results;
        console.log(this.allProducts);
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  productHover(data: any) {
    this.currentHover = data;
  }

  onProductClick(id: any) {
    this._router.navigate([`shop/product/${id}`]);
  }

  addToBag(productInfo: any) {
    let cartArray: any[] = [];
    this.store.select('cart').subscribe({
      next: (data) => {
        cartArray = data.cartItems;
      },
    });
    let isAvailable: boolean = false;

    cartArray.forEach((data) => {
      console.log(data);
      if (data.cartObj.productId === productInfo._id) {
        isAvailable = true;
        return;
      }
    });
    if (isAvailable) {
      return alert('Product is already in cart');
    }
    let cartObj = {
      name: productInfo.name,
      price: productInfo.price,
      productId: productInfo._id,
      qty: 1,
      subTotal: productInfo.price,
      image: productInfo.images[0].url,
      deal: {
        price: productInfo?.deal?.price,
        discount: productInfo?.deal?.discount,
        ends: productInfo?.deal?.ends,
      },
    };

    this.store.dispatch(addProduct({ cartObj: cartObj }));
  }
}
