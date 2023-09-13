import { Component, OnInit } from '@angular/core';
import { ShopSettingService } from '../../setting/services/shop-setting.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  profileData: any;
  addresses: any[] = [];
  isAddNewAddress: boolean = false;
  deliveryFee: number = 40;
  isStandard: boolean = true;
  firstName: string = '';
  lastName: string = '';
  address: any;
  isChangeAddress: boolean = false;
  constructor(
    private _shopSetting: ShopSettingService,
    private _router: Router,
    private _activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.profileDataFun();

    this._activeRouter.queryParamMap.subscribe({
      next: (data: any) => {
        if (data.params.isStandard) {
          this.deliveryFee = parseInt(data.params.isStandard);
          console.log(this.deliveryFee);
        } else {
          this.deliveryFee = 40;
        }
      },
    });
  }

  profileDataFun() {
    this._shopSetting.getProfileData().subscribe({
      next: (data: any) => {
        this.profileData = data.results;
        this.firstName = this.profileData.name.split(' ')[0];
        this.lastName = this.profileData.name.split(' ')[1];
        this.address = this.profileData.address[0];
        this.addresses = this.profileData.address;
        this.sendAddress(this.address._id);
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  addNewAddressFun(data: any) {
    let obj = {
      street: data['street-address'],
      addressLine2: data['addressLine2'],
      city: data['city'],
      state: data['state'],
      pin: data['postal-code'],
    };

    this._shopSetting.addNewAddress(obj).subscribe({
      next: (data: any) => {
        // this.profileDataFun();
        this.address = data;
        this.isAddNewAddress = false;
        this.isChangeAddress = false;
        this.sendAddress(this.address._id);
      },
    });
  }

  sendAddress(addressId: string) {
    this._router.navigate(['/shop/order/checkout'], {
      queryParams: { addressId: addressId, isStandard: this.deliveryFee },
    });
  }
}
