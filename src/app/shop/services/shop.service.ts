import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private _http: HttpClient) {}

  getAllProducts(data?: any) {
    return this._http.get(`${environment.API}/shop/products`, { params: data });
  }
  getSpecificProduct(id: string) {
    return this._http.get(`${environment.API}/products/${id}`);
  }
}
