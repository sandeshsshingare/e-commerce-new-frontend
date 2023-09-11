import { Component, OnInit } from '@angular/core';
import { ShopSettingService } from '../services/shop-setting.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileInfo: any;
  constructor(private _setting: ShopSettingService) {
    this.getProfileData();
    console.log('called');
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
