import { Component, OnInit } from '@angular/core';
import { ShopSettingService } from '../services/shop-setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  constructor(private _shopSetting: ShopSettingService) {}
  allAddress: any[] = [];
  isAddAddress: boolean = false;
  isUpdateAddress: boolean = false;
  updateAddressDetails: any;
  ngOnInit(): void {
    this.getAllAddress();
  }

  getAllAddress() {
    this._shopSetting.getAllAddress().subscribe({
      next: (data: any) => {
        console.log(data, 'this is addresses');
        let isArray = Array.isArray(data.results);
        if (isArray) {
          this.allAddress = data.results;
        } else {
          this.allAddress = [data.results];
        }
        console.log('all addresses', this.allAddress);
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  addAddressToggle() {
    this.isAddAddress = true;
    this.updateAddressDetails = {};
  }

  addAddress(data: any) {
    let obj = {
      street: data['street-address'],
      addressLine2: data['addressLine2'],
      city: data['city'],
      state: data['state'],
      pin: data['postal-code'],
    };
    this._shopSetting.addNewAddress(obj).subscribe({
      next: (data) => {
        alert('address added');
        this.getAllAddress();
        this.isAddAddress = false;
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  deleteAddress(id: string) {
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
        this._shopSetting.deleteAddress(id).subscribe({
          next: (data) => {
            // alert('address deleted');
            this.getAllAddress();
          },
          error: (err) => {
            alert(err.error.message);
          },
        });
      }
    });
  }

  updateToggle(data: any) {
    this.updateAddressDetails = data;
    this.isUpdateAddress = true;
  }

  updateAddress(data: any, id: string) {
    let obj = {
      street: data['street-address'],
      addressLine2: data['addressLine2'],
      city: data['city'],
      state: data['state'],
      pin: data['postal-code'],
    };
    this._shopSetting.updateAddress(obj, id).subscribe({
      next: (data) => {
        alert('address updated');
        this.getAllAddress();
        this.isUpdateAddress = false;
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }
}
