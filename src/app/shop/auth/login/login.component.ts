import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';
import { Router } from '@angular/router';
import { ShopSettingService } from '../../setting/services/shop-setting.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @ViewChild(NotificationComponent) nc!: NotificationComponent;
  flag: boolean = false;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _shopSetting: ShopSettingService
  ) {
    this._shopSetting.profileData.subscribe((data) => {
      if (data.isLogin) {
        // this._router.navigate(['/shop']);
      }
    });
  }

  signInFun(data: any) {
    this._auth.signIn(data).subscribe({
      next: (data: any) => {
        console.log(data);
        this._shopSetting.profileData.next({ isLogin: true });
        // this._shopSetting.emitProfileData();

        localStorage.setItem('customerToken', data.token);
        this._router.navigate(['/shop/setting/profile']);
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
