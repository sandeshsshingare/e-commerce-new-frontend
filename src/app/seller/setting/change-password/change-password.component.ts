import { Component } from '@angular/core';
import { SettingService } from '../service/setting.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  isSuccess: boolean = false;
  errorMsg!: any;
  constructor(
    private _setting: SettingService,
    private _toastr: ToastrService
  ) {}

  changePassword(data: any) {
    if (data.new_password !== data.confirm_password) {
      this._toastr.error('Please confirm your password', 'Error');
      this.errorMsg = 'Please confirm your password';
      console.log('Please confirm your password');
      return;
    }

    let obj = {
      old_password: data.old_password,
      new_password: data.new_password,
    };

    this._setting.changePassword(obj).subscribe({
      next: (data) => {
        // this._toastr.success('Password changed successfully', 'Success');
      },
      error: (err) => {
        this._toastr.error(err, 'Error');
        console.log(err.error.message);
        this.errorMsg = err.error.message;
      },
      complete: () => {
        this.errorMsg = undefined;
        this._toastr.success('Password changed successfully', 'Success');
        console.log('password changed successfully');
        this.isSuccess = true;
      },
    });
  }
}
