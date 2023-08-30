import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../setting/service/setting.service';
import { AuthService } from '../authServices/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(private _auth: AuthService, private activeRoute: ActivatedRoute) {
    console.log('Reset password');
  }
  errorMsg: any;
  isSuccess: boolean = false;
  token: any;
  ngOnInit(): void {
    console.log(this.activeRoute.snapshot.queryParams);
    this.token = this.activeRoute.snapshot.queryParams['token'];
  }

  resetPassword(data: any) {
    if (data.new_password !== data.confirm_password) {
      this.errorMsg = 'Please confirm your password';
      console.log('Please confirm your password');
      return;
    }

    let obj = {
      password: data.new_password,
      token: this.token,
    };

    this._auth.resetPassword(obj).subscribe({
      next: (data) => {
        // this._toastr.success('Password changed successfully', 'Success');
      },
      error: (err) => {
        console.log(err.error.message);
        this.errorMsg = err.error.message;
      },
      complete: () => {
        this.errorMsg = undefined;
        console.log('password changed successfully');
        this.isSuccess = true;
      },
    });
  }
}
