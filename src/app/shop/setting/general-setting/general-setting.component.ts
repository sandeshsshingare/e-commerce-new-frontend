import { Component, OnInit } from '@angular/core';
import { ShopSettingService } from '../services/shop-setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-general-setting',
  templateUrl: './general-setting.component.html',
  styleUrls: ['./general-setting.component.css'],
})
export class GeneralSettingComponent implements OnInit {
  profileData: any;
  firstName!: string;
  lastName!: string;
  email!: string;
  PictureAdded: string = 'JPG, GIF or PNG. 1MB max.';

  constructor(private _shopSetting: ShopSettingService) {}

  ngOnInit(): void {
    this._shopSetting.getProfileData().subscribe({
      next: (data: any) => {
        this.profileData = data.results;
        console.log(this.profileData);
        let name = this.profileData.name.split(' ');
        (this.firstName = name[0]), (this.lastName = name[1]);
        this.email = this.profileData.email;

        let obj = {
          name: this.profileData.name,
          picture: this.profileData.picture,
          email: this.profileData.email,
          isLogin: true,
          _id: this.profileData._id,
        };
        this._shopSetting.profileData.next(obj);
      },
    });
  }

  isAvatarChange: boolean = false;
  formData = new FormData();
  isPictureUpdate: boolean = false;

  updatePicture(event: any) {
    this.isPictureUpdate = true;
    this.isAvatarChange = false;
    this.formData.append('picture', event.target.files[0]);
    if (this.formData.has('picture')) {
      this.PictureAdded = 'File attached...';
    }
  }
  deletePicture() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        this._shopSetting.deleteProfilePicture().subscribe({
          next: (data) => {},
          error: (err) => {},
          complete: () => {
            this.ngOnInit();
          },
        });
      }
    });
  }

  saveDetails(data: any) {
    if (this.formData.has('picture')) {
      this._shopSetting.updateProfilePicture(this.formData).subscribe({
        next: (data) => {
          console.log('updated successfully');
          this.PictureAdded = 'JPG, GIF or PNG. 1MB max.';
        },

        error: (err) => {
          alert(err.error.message);
          this.formData.delete('picture');
        },
      });
    }
    let obj = {
      name: data['first-name'] + ' ' + data['last-name'],
      email: data['email'],
    };
    this.formData.delete('picture');
    this._shopSetting.updateCustomerProfile(obj).subscribe({
      next: (data) => {},
      error: (err) => {
        alert(err.error.message);
      },
      complete: () => {
        this.ngOnInit();
      },
    });
  }
}
