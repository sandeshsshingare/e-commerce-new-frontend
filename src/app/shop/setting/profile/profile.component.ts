import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileInfo: any;
  constructor(private _setting: ShopService) {}

  ngOnInit(): void {
    this.getProfileData();
  }

  getProfileData() {
    this._setting.getProfileData().subscribe({
      next: (data: any) => {
        this.profileInfo = data.results;
        console.log(this.profileInfo);
        let obj = {
          name: this.profileInfo.name,
          picture: this.profileInfo.picture,
        };
        this._setting.profileData.next(obj);
      },
      error: () => {},
      complete: () => {},
    });
  }
}
