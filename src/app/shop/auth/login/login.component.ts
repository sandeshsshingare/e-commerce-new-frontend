import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopSettingService } from '../../setting/services/shop-setting.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild(NotificationComponent) nc!: NotificationComponent;
  flag: boolean = false;
  user: any;
  loggedIn: any;
  captcha: any;
  profileInfo: any;
  productId: any;
  isRating: boolean = false;
  isCheckout: boolean = false;
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _shopSetting: ShopSettingService,
    private _activeRoute: ActivatedRoute,
    private authService: SocialAuthService
  ) {
    this.isRating = this._activeRoute.snapshot.queryParams['rating'];
    this.productId = this._activeRoute.snapshot.queryParams['productId'];
    this.isCheckout = this._activeRoute.snapshot.queryParams['isCheckout'];
    console.log('is rating', this.isRating);

    this._auth.getRecaptcha().subscribe((data) => {
      this.captcha = data;
      console.log('this is captcha', this.captcha);
    });

    this._shopSetting.profileData.subscribe((data) => {
      if (data.isLogin) {
        // this._router.navigate(['/shop']);
      }
    });
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      // console.log(this.user.email, ' From User');
      this.loggedIn = user != null;
      console.log(this.captcha);
      let obj = {
        email: this.user.email,
        captcha: this.captcha,
        idToken: this.user.idToken,
      };

      this._auth.signInWithGoogle(obj).subscribe((data: any) => {
        console.log(data);
        this.profileInfo = data;
        // alert('called');
        let token = localStorage.getItem('customerToken');
        if (token === '123') {
          localStorage.removeItem('customerToken');
          let obj = {
            name: this.profileInfo.name,
            picture: this.profileInfo.picture,
            email: this.profileInfo.email,
            isLogin: true,
          };
          this._shopSetting.profileData.next({ isLogin: true });
          // this._shopSetting.emitProfileData();

          localStorage.setItem('customerToken', data.token);
          return this._router.navigate(['/shop/setting/profile']);

          // return this._auth.isLogin.next(false);
        }
        localStorage.setItem('customerToken', data.token);
        this._router.navigateByUrl('/shop/setting/profile');
        return Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Login successfully done',
          showConfirmButton: false,
          timer: 1500,
        });
      });
    });
  }

  googleSignIn() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      console.log(this.user);
    });
  }

  signInFun(data: any) {
    this._auth.signIn(data).subscribe({
      next: (data: any) => {
        console.log(data);
        this._shopSetting.profileData.next({ isLogin: true });
        // this._shopSetting.emitProfileData();

        localStorage.setItem('customerToken', data.token);

        if (this.isRating) {
          this._router.navigate(['/shop/setting/profile'], {
            queryParams: { rating: true, productId: this.productId },
          });
        } else if (this.isCheckout) {
          this._router.navigate(['/shop/setting/profile'], {
            queryParams: { isCheckout: true },
          });
        } else {
          this._router.navigate(['/shop/setting/profile']);
        }
      },
      error: (err) => {
        this.nc.alert('Error', err.error.message, true, true);
      },
      complete: () => {
        this.nc.alert('Success', 'Login successfully', true, false, true);
      },
    });
  }
}
