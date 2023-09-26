import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _http: HttpClient,
    private _recaptcha: ReCaptchaV3Service
  ) {}

  signUp(data: any) {
    return this._http.post(`${environment.API}/shop/auth/register`, data);
  }

  signIn(data: any) {
    return this._http.post(`${environment.API}/shop/auth/login`, data);
  }

  signInWithGoogle(data: any) {
    return this._http.post(`${environment.API}/shop/auth/login/google`, data);
  }

  getRecaptcha() {
    return this._recaptcha.execute('login');
  }
}
