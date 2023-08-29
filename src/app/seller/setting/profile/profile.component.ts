import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/authServices/auth.service';
import { SettingService } from '../service/setting.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private _setting: SettingService) {}
  profileData: any;

  ngOnInit(): void {
    this.getProfileDate();
  }

  getProfileDate() {
    this._setting.sellerGetProfile().subscribe({
      next: (data) => {
        console.log(data);
        this.profileData = data;
      },
    });
  }
}
