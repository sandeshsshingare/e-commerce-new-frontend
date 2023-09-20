import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../../../environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SettingService } from '../../setting/service/setting.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _setting: SettingService,
    private _recaptcha: ReCaptchaV3Service
  ) {}
  sellerLogin(data: any) {
    let obj = {
      email: data.email,
      password: data.password,
    };
    return this._http.post(`${environment.API}/auth/login`, obj);
  }
  token1: any;

  isLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  sellerRegister(data: any) {
    let obj = {
      name: data.name,
      email: data.email,
      companyName: data.companyName,
      password: data.password,
      captcha: data.captcha,
    };
    console.log(obj);
    return this._http.post(`${environment.API}/auth/register`, obj);
  }

  // sellerGetProfile(): Promise<Observable<any>> {
  //   return new Promise<Observable<any>>((resolve, reject) => {
  //     this.tokenData.subscribe({
  //       next: (data: any) => {
  //         this.token1 = data;
  //         let headers = { Authorization: `Bearer ${this.token1}` };
  //         resolve(
  //           this._http.get(`${environment.API}/auth/self`, { headers: headers })
  //         );
  //       },
  //       error: (err: any) => {
  //         reject(err);
  //       },
  //     });
  //   });
  // }

  isLoggedIn(): Promise<Observable<any>> {
    return new Promise((resolve, reject) => {
      this._setting.sellerGetProfile()?.subscribe({
        next: (data: any) => {
          this.isLogin.next(true);
          let obj = { ...data, isAccess: true };
          resolve(obj);
        },
        error: (err) => {
          // this._router.navigate(['auth/login']);
          this.isLogin.next(false);
          let obj: any = { isAccess: false };
          resolve(obj);
        },
      });
    });
  }

  forgotEmailS(email: any) {
    return this._http.post(`${environment.API}/auth/forgot-password`, {
      email,
    });
  }

  resetPassword(data: any) {
    let params: any = { token: data.token };
    return this._http.post(
      `${environment.API}/auth/reset-password`,
      data.password,
      { params: params }
    );
  }

  signInWithGoogle(data: any) {
    return this._http.post(`${environment.API}/auth/login/google`, data);
  }

  getCaptcha() {
    return new Promise((resolve, reject) => {
      this._recaptcha.execute('login').subscribe({
        next: (data: any) => {
          console.log(data);
          resolve(data);
        },
        error: (err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.error.message,
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    });
  }
}
