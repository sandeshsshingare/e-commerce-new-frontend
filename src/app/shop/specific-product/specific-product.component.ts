import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-specific-product',
  templateUrl: './specific-product.component.html',
  styleUrls: ['./specific-product.component.css'],
})
export class SpecificProductComponent implements OnInit {
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
    private _shop: ShopService
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
}
