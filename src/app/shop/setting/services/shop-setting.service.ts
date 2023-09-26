import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopSettingService {
  constructor(private _http: HttpClient) {
    this.getHeaders();
  }

  headers: any;

  getHeaders() {
    let token = localStorage.getItem('customerToken');
    this.headers = { Authorization: `Bearer ${token}` };
    return this.headers;
  }

  profileData = new BehaviorSubject<any>({});

  getProfileData() {
    let token = localStorage.getItem('customerToken');
    let headers = { Authorization: `Bearer ${token}` };
    return this._http.get(`${environment.API}/shop/auth/self`, {
      headers: headers,
    });
  }

  emitProfileData() {
    this.getProfileData().subscribe({
      next: (data: any) => {
        let profileInfo = data.results;
        let obj = {
          name: profileInfo.name,
          picture: profileInfo.picture,
          email: profileInfo.email,
          isLogin: true,
          _id: profileInfo._id,
        };
        this.profileData.next(obj);
      },
    });
  }

  changePassword(data: any) {
    return this._http.post(
      `${environment.API}/customers/auth/change-password`,
      data,
      { headers: this.headers }
    );
  }

  deleteAccount() {
    return this._http.delete(`${environment.API}/customers/account`, {
      headers: this.headers,
    });
  }

  updateProfilePicture(data: any) {
    return this._http.post(
      `${environment.API}/customers/profile-picture`,
      data,
      { headers: this.headers }
    );
  }

  deleteProfilePicture() {
    this.getHeaders();
    return this._http.delete(`${environment.API}/customers/profile-picture`, {
      headers: this.headers,
    });
  }

  updateCustomerProfile(data: any) {
    this.getHeaders();
    console.log(this.headers);
    return this._http.patch(
      `${environment.API}/customers/update-profile`,
      data,
      { headers: this.headers }
    );
  }

  getAllAddress() {
    this.getHeaders();
    return this._http.get(`${environment.API}/customers/address`, {
      headers: this.headers,
    });
  }

  addNewAddress(data: any) {
    this.getHeaders();
    return this._http.post(`${environment.API}/customers/address`, data, {
      headers: this.headers,
    });
  }

  updateAddress(data: any, id: string) {
    this.getHeaders();
    return this._http.put(`${environment.API}/customers/address/${id}`, data, {
      headers: this.headers,
    });
  }

  deleteAddress(id: any) {
    this.getHeaders();
    return this._http.delete(`${environment.API}/customers/address/${id}`, {
      headers: this.headers,
    });
  }
}
