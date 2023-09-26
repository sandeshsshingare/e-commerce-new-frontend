import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from '../services/shop.service';
import { cartReducer } from '../states/cart.reducer';
import { Store } from '@ngrx/store';
import { appState } from '../store/app.state';
import { addProduct } from '../states/cart.action';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopSettingService } from '../setting/services/shop-setting.service';

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
  customerId!: string;
  reviewContent: any;
  reviewStar: number = 0;
  pointsArray: any[] = [];
  reviewAvg: number = 0;
  expandIndex: number = -1;
  isWriteReviews: boolean = false;
  isReviewButton: boolean = false;
  currentImage!: String;
  productImage: any[] = [];
  ratingForm!: FormGroup;
  reviewPercentage: any = {
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
  };
  no: any = 30;
  customerData: any;
  reviewArray: any[] = [];

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
  starRating: any;

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
    private store: Store<appState>,
    private _router: Router,
    private fb: FormBuilder,
    private _shopSetting: ShopSettingService
  ) {
    this.ratingForm = this.fb.group({
      rating: ['', Validators.required],
      caption: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.isReviewButton =
      Boolean(this._activeRoute.snapshot.queryParamMap.get('writeReview')) ||
      false;
    this.productId = this._activeRoute.snapshot.params['productId'];
    console.log(this.productId);
    this._shopSetting.profileData.subscribe({
      next: (data) => {
        console.log(data);
        this.customerId = data._id;
        this.customerData = data;
      },
    });
    this.getProductInfo();
  }

  getProductInfo() {
    this._shop.getSpecificProduct(this.productId).subscribe({
      next: (data: any) => {
        this.productInfo = data.data;
        this.currentImage = this.productInfo.images[0].url;
        this.productImage = this.productInfo.images;
        this.reviewArray = this.productInfo.reviews;
        this.calculateReview();
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

  calculateReview() {
    let obj = {
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
    };
    this.reviewPercentage = obj;

    let allReviews = this.reviewArray.length;

    this.reviewArray.forEach((data) => {
      switch (+data.star) {
        case 1: {
          obj.one += 1;
          break;
        }
        case 2: {
          obj.two += 1;
          break;
        }
        case 3: {
          obj.three += 1;
          break;
        }
        case 4: {
          obj.four += 1;
          break;
        }
        case 5: {
          obj.five += 1;
          break;
        }
      }
    });

    this.reviewAvg =
      Math.floor(
        obj.one + obj.two * 2 + obj.three * 3 + obj.four * 4 + obj.five * 5
      ) / allReviews;

    this.reviewPercentage.one = Math.floor((obj.one / allReviews) * 100);
    this.reviewPercentage.two = Math.floor((obj.two / allReviews) * 100);
    this.reviewPercentage.three = Math.floor((obj.three / allReviews) * 100);
    this.reviewPercentage.four = Math.floor((obj.four / allReviews) * 100);
    this.reviewPercentage.five = Math.floor((obj.five / allReviews) * 100);
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

  writeAReview(): any {
    console.log(Object.keys(this.customerData).length <= 0);
    console.log(this.customerData.isLogin);
    if (!this.customerData.isLogin) {
      return this._router.navigate(['/shop/auth/sign-in'], {
        queryParams: { rating: true, productId: this.productId },
      });
    } else {
      this.isWriteReviews = true;
    }
  }

  addReview(): any {
    this.isWriteReviews = false;
    let data = {
      star: this.ratingForm.value.rating,
      caption: this.ratingForm.value.caption,
      customer_name: this.customerData.name,
      customer_photo: this.customerData.picture,
    };
    console.log(data);
    this._shop.addReview(this.productId, data).subscribe({
      next: (data: any) => {
        this.productInfo = data.results;
        this.reviewArray = this.productInfo.reviews;
        this.getProductInfo();
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }
  reviewStars(data: any) {
    console.log(data);
  }
}
