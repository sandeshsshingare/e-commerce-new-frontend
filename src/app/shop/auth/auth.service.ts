import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  signUp(data: any) {
    return this._http.post(`${environment.API}/shop/auth/register`, data);
  }

  signIn(data: any) {
    return this._http.post(`${environment.API}/shop/auth/login`, data);
  }
}
