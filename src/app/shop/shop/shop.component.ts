import { Component, OnInit } from '@angular/core';
import { ShopSettingService } from '../setting/services/shop-setting.service';
import { ShopService } from '../services/shop.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { appState } from '../store/app.state';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  isMobile: boolean = false;
  isDropdown: boolean = false;
  isLogin: boolean = false;
  profileDataObj: any;
  profileInfo: any;
  noOfCartItems: number = 0;
  constructor(
    private _shopSetting: ShopSettingService,
    private _shop: ShopService,
    private _router: Router,
    private _store: Store<appState>
  ) {}

  ngOnInit(): void {
    this._shopSetting.getProfileData().subscribe((data: any) => {
      this.profileInfo = data.results;

      let obj = {
        name: this.profileInfo.name,
        picture: this.profileInfo.picture,
        email: this.profileInfo.email,
        isLogin: true,
      };
      this._shopSetting.profileData.next(obj);
    });

    this._store.select('cart').subscribe({
      next: (data: any) => {
        console.log(data.cartItems.length);
        this.noOfCartItems = data.cartItems.length || 0;
      },
    });

    this._shopSetting.profileData.subscribe({
      next: (data) => {
        this.profileDataObj = data;
        this.isLogin = data.isLogin;
        console.log(this.isLogin, 'is login');
        if (this.isLogin) {
          // this._router.navigate([''])
        }
      },
      error: (err) => {},
    });
  }

  searchFunction(data: any) {
    this._shop.searchProduct.next(data);
  }

  signOut() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to logout!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Logged out!',
          'Your request of logout is accepted.',
          'success'
        );
        localStorage.setItem('customerToken', '123');
        // localStorage.removeItem('customerToken');
        this._shopSetting.profileData.next({ isLogin: false });
        this._router.navigate(['/shop']);
      }
    });
  }
}
