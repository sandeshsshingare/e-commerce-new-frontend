import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  searchProduct: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private _http: HttpClient) {}

  getAllProducts(data?: any) {
    return this._http.get(`${environment.API}/shop/products`, { params: data });
  }
  getSpecificProduct(id: string) {
    return this._http.get(`${environment.API}/products/${id}`);
  }

  getProfileData() {
    let token = localStorage.getItem('customerToken');
    let headers = { Authorization: `Bearer ${token}` };
    return this._http.get(`${environment.API}/shop/auth/self`, {
      headers: headers,
    });
  }

  isLoginFunction() {
    return new Promise<boolean>((resolve, reject) => {
      this.getProfileData().subscribe({
        next: (data) => {
          console.log(data);
          resolve(true);
        },
        error: (err) => {
          reject(false);
        },
        complete: () => {
          resolve(true);
        },
      });
    });
  }
}
