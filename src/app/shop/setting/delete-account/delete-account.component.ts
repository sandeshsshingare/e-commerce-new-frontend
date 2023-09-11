import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ShopSettingService } from '../services/shop-setting.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css'],
})
export class DeleteAccountComponent {
  constructor(private _shopSetting: ShopSettingService) {}
  deleteAccount() {
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
        this._shopSetting.deleteAccount().subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (err) => {
            console.log(err.error.message);
          },
        });
      }
    });
  }
}
