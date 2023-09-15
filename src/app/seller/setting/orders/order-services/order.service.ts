import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  headers: any;
  constructor(private _http: HttpClient) {
    this.headers = this.getHeaders();
  }

  getHeaders() {
    let token = localStorage.getItem('token');
    let header = { Authorization: `Bearer ${token}` };
    return header;
  }

  getOrderList(pagination: any) {
    this.getHeaders();
    return this._http.get(
      `${environment.API}/orders?page=${pagination.page}&limit=${pagination.limit}`,
      {
        headers: this.headers,
      }
    );
  }
  getSpecificOrder(orderId: string) {
    this.getHeaders();
    return this._http.get(`${environment.API}/orders/${orderId}`, {
      headers: this.headers,
    });
  }

  actionOnOrder(orderId: string, action: string) {
    this.getHeaders();
    return this._http.patch(
      `${environment.API}/orders/${action}/${orderId}`,
      null,
      {
        headers: this.headers,
      }
    );
  }
}
