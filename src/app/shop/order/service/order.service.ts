import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  headers: any;

  constructor(private _http: HttpClient) {}

  getHeaders() {
    let token = localStorage.getItem('customerToken') || '';

    this.headers = { Authorization: `Bearer ${token}` };
    return this.headers;
  }

  placeOrder(data: any) {
    this.getHeaders();
    return this._http.post(`${environment.API}/shop/orders`, data, {
      headers: this.headers,
    });
  }

  makePayments(data: any, orderId: any) {
    this.getHeaders();
    return this._http.put(
      `${environment.API}/shop/orders/confirm/${orderId}`,
      data,
      { headers: this.headers }
    );
  }

  getOrderList(pagination: any) {
    this.getHeaders();
    return this._http.get(
      `${environment.API}/shop/orders?page=${pagination.page}&limit=${pagination.limit}`,
      {
        headers: this.headers,
      }
    );
  }
  getSpecificOrder(orderId: string) {
    this.getHeaders();
    return this._http.get(`${environment.API}/shop/orders/${orderId}`, {
      headers: this.headers,
    });
  }

  cancelOrder(orderId: string) {
    this.getHeaders();
    return this._http.patch(
      `${environment.API}/shop/orders/cancel/${orderId}`,
      null,
      {
        headers: this.headers,
      }
    );
  }
}
