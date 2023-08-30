import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { AuthService } from '../../auth/authServices/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  token1: any;
  headers: any;
  constructor(private _http: HttpClient) {
    this.headers = this.getHeader();
  }

  getHeader() {
    let token = localStorage.getItem('token');
    let header = { Authorization: `Bearer ${token}` };
    return header;
  }

  sellerGetProfile() {
    let token = localStorage.getItem('token');
    this.headers = { Authorization: `Bearer ${token}` };
    return this._http.get(`${environment.API}/auth/self`, {
      headers: this.headers,
    });
  }

  orgData() {
    return this._http.get(`${environment.API}/users/org`, {
      headers: this.headers,
    });
  }
  editOrg(data: any) {
    return this._http.patch(`${environment.API}/users/org`, data, {
      headers: this.headers,
    });
  }
  allUsers(pagination: any) {
    return this._http.get(
      `${environment.API}/users?page=${pagination.page}&limit=${pagination.limit}`,
      {
        headers: this.headers,
      }
    );
  }
  createUser(data: any) {
    return this._http.post(`${environment.API}/users`, data, {
      headers: this.headers,
    });
  }
  deleteUser(userId: any) {
    return this._http.delete(`${environment.API}/users/${userId}`, {
      headers: this.headers,
    });
  }
  editRole(role: any, userId: any) {
    return this._http.patch(
      `${environment.API}/users/role/${userId}`,
      { role: role },
      {
        headers: this.headers,
      }
    );
  }
  updateUserInfo(data: any, userId: any) {
    return this._http.patch(`${environment.API}/users/${userId}`, data, {
      headers: this.headers,
    });
  }

  changePassword(data: any) {
    return this._http.post(`${environment.API}/auth/change-password`, data, {
      headers: this.headers,
    });
  }

  verifyEmail() {
    return this._http.post(
      `${environment.API}/auth/send-verification-email`,
      null,
      { headers: this.headers }
    );
  }

  verify(token: any) {
    let params: any = { token: token };
    return this._http.post(`${environment.API}/auth/verify-email`, null, {
      params: params,
    });
  }
}
