import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/authServices/auth.service';
import { SettingService } from '../service/setting.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private _setting: SettingService, private _auth: AuthService) {}
  profileData: any;
  isVerified: boolean = false;
  ngOnInit(): void {
    this.getProfileDate();
    this._auth.isLogin.next(true);
  }

  getProfileDate() {
    this._setting.sellerGetProfile().subscribe({
      next: (data) => {
        console.log(data);
        this.profileData = data;
        this.isVerified = this.profileData?.isEmailVerified;
      },
    });
  }
  verify() {
    this._setting.verifyEmail().subscribe({
      next: (data) => {
        console.log('verify email sent');
      },
      error: (err) => {
        console.log('email ', err.error.message);
      },
    });
  }
}
