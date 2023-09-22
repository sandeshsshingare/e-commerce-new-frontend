import { Component, OnInit, ViewChild } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { appState } from '../store/app.state';
import { addProduct } from '../states/cart.action';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  @ViewChild(NotificationComponent) nc!: NotificationComponent;
  flag: boolean = false;
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
  ) {
    this.searchProduct();
  }

  ngOnInit(): void {
    // this.getAllProducts();
  }
  getAllProducts() {
    this._shop.getAllProducts(this.allController).subscribe({
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
      return this.nc.alert(
        'Success',
        'Product added to cart successfully',
        true,
        false,
        true
      );
    }
    let cartObj = {
      name: productInfo.name,
      originalPrice: productInfo.deal ? productInfo.price : undefined,
      price: productInfo.deal ? productInfo.dealPrice : productInfo.price,
      productId: productInfo._id,
      qty: 1,
      subTotal: productInfo.deal ? productInfo.dealPrice : productInfo.price,
      image: productInfo.images[0].url,
      deal: {
        price: productInfo?.deal?.price,
        discount: productInfo?.deal?.discount,
        ends: productInfo?.deal?.ends,
      },
    };
    console.log(this.nc);
    this.nc.alert(
      'Success',
      'Product added to cart successfully',
      true,
      false,
      true
    );
    console.log('add to cart called');
    this.store.dispatch(addProduct({ cartObj: cartObj }));
  }

  searchProduct() {
    console.log('search called');
    this._shop.searchProduct.subscribe((data: string) => {
      console.log(data.length);
      if (data.length >= 3) {
        this.allController['search'] = data;
        this.getAllProducts();
      } else if (data.length === 0) {
        this.allController['search'] = '';
        this.getAllProducts();
      }
    });
  }
}
