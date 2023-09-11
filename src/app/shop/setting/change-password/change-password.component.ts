import { Component } from '@angular/core';
import { ShopSettingService } from '../services/shop-setting.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  oldPassword: any;
  password: any;
  confirmPassword: any;

  constructor(private _shopSetting: ShopSettingService) {}

  changePassword() {
    if (this.password !== this.confirmPassword) {
      return alert('Confirm your password');
    }

    this._shopSetting
      .changePassword({
        old_password: this.oldPassword,
        new_password: this.password,
      })
      .subscribe({
        next: (data) => {},
        error: (err) => {
          console.log(err.error.message);
        },
        complete: () => {
          console.log('Password changed successfully');
        },
      });
  }
}
