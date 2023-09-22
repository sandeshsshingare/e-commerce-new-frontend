import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../services/shop.service';
import { cartReducer } from '../states/cart.reducer';
import { Store } from '@ngrx/store';
import { appState } from '../store/app.state';
import { addProduct } from '../states/cart.action';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';

@Component({
  selector: 'app-specific-product',
  templateUrl: './specific-product.component.html',
  styleUrls: ['./specific-product.component.css'],
})
export class SpecificProductComponent implements OnInit {
  @ViewChild(NotificationComponent) nc!: NotificationComponent;
  flag: boolean = false;
  productId: any;
  productInfo: any;
  isFeatures: boolean = false;
  pointsArray: any[] = [];
  expandIndex: number = -1;
  currentImage!: String;
  productImage: any[] = [];
  allArray: any[] = [
    {
      title: 'Features',
      points: [
        'Multiple strap configurations',
        'Spacious interior with top zip',
        'Leather handle and tabs',
        'Interior dividers',
        'Stainless strap loops',
        'Double stitched construction',
        'Water-resistant',
      ],
    },
    {
      title: 'Care',
      points: [
        'Spot clean as needed',
        'Hand wash with mild soap',
        'Machine wash interior dividers',
        'Treat handle and tabs with leather conditioner',
      ],
    },
    {
      title: 'Shipping',
      points: [
        'Free shipping on orders over $300',
        'International shipping available',
        'Expedited shipping options',
        'Signature required upon delivery',
      ],
    },
    {
      title: 'Returns',
      points: [
        'Easy return requests',
        'Pre-paid shipping label included',
        '10% restocking fee for returns',
        '60 day return window',
      ],
    },
  ];

  featuresClicked(item: any, index: number) {
    console.log('clicked');
    if (this.expandIndex === index) {
      this.expandIndex = -1;
      return;
    }
    this.expandIndex = index;
    this.pointsArray = item.points;
    this.isFeatures = !this.isFeatures;
  }

  constructor(
    private _activeRoute: ActivatedRoute,
    private _shop: ShopService,
    private store: Store<appState>
  ) {}

  ngOnInit(): void {
    this.productId = this._activeRoute.snapshot.params['productId'];
    console.log(this.productId);

    this.getProductInfo();
  }

  getProductInfo() {
    this._shop.getSpecificProduct(this.productId).subscribe({
      next: (data: any) => {
        this.productInfo = data.data;
        this.currentImage = this.productInfo.images[0].url;
        this.productImage = this.productInfo.images;
        console.log(data);
      },
      error: (err) => {
        console.log(err.error.message);
      },
      complete: () => {
        console.log('product details get successfully');
      },
    });
  }

  addToBag() {
    let cartArray: any[] = [];
    this.store.select('cart').subscribe({
      next: (data) => {
        cartArray = data.cartItems;
      },
    });
    let isAvailable: boolean = false;

    cartArray.forEach((data) => {
      console.log(data);
      if (data.cartObj.productId === this.productInfo._id) {
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
      name: this.productInfo.name,
      originalPrice: this.productInfo.deal ? this.productInfo.price : undefined,
      price: this.productInfo.deal
        ? this.productInfo.dealPrice
        : this.productInfo.price,
      productId: this.productInfo._id,
      qty: 1,
      subTotal: this.productInfo.deal
        ? this.productInfo.dealPrice
        : this.productInfo.price,
      image: this.productInfo.images[0].url,
      deal: {
        price: this.productInfo?.deal?.price,
        discount: this.productInfo?.deal?.discount,
        ends: this.productInfo?.deal?.ends,
      },
    };
    this.nc.alert(
      'Success',
      'Product added to cart successfully',
      true,
      false,
      true
    );
    this.store.dispatch(addProduct({ cartObj: cartObj }));
  }
}
