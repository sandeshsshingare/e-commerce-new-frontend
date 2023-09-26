import { Component, OnInit } from '@angular/core';
import { ShopSettingService } from '../services/shop-setting.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileInfo: any;
  constructor(
    private _setting: ShopSettingService,
    private _activeRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.getProfileData();
    let isRating = this._activeRoute.snapshot.queryParams['rating'];
    let productId = this._activeRoute.snapshot.queryParams['productId'];
    let isCheckout = this._activeRoute.snapshot.queryParams['isCheckout'];
    if (isCheckout) {
      this._router.navigate(['/shop/order/checkout']);
    }
    if (isRating) {
      this._router.navigate(['/shop/product/' + productId]);
    }
    console.log('is rating', isRating);
  }

  ngOnInit(): void {}

  getProfileData() {
    this._setting.getProfileData().subscribe({
      next: (data: any) => {
        this.profileInfo = data.results;
        console.log(this.profileInfo);
        let obj = {
          name: this.profileInfo.name,
          picture: this.profileInfo.picture,
          email: this.profileInfo.email,
          isLogin: true,
        };
        this._setting.profileData.next(obj);
      },
      error: (err) => {
        console.log(err.error.message);
      },
      complete: () => {},
    });
  }
}
