import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private _http: HttpClient) {}

  profileData = new BehaviorSubject<any>({});

  getProfileData() {
    let token = localStorage.getItem('customerToken');
    let headers = { Authorization: `Bearer ${token}` };
    return this._http.get(`${environment.API}/shop/auth/self`, {
      headers: headers,
    });
  }
}
