import { Component } from '@angular/core';
import { AuthService } from '../authServices/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  captcha: any;
  constructor(private _auth: AuthService, private _router: Router) {
    this._auth.getCaptcha().then((data) => {
      this.captcha = data;
      console.log(this.captcha);
    });
    this._auth.isLogin.subscribe({
      next: (data) => {
        if (data) {
          this._router.navigate(['setting/profile']);
        }
      },
    });
  }
  registerData(data: any) {
    let obj = { ...data, captcha: this.captcha };
    console.log(obj);
    this._auth.sellerRegister(obj).subscribe({
      next: (data: any) => {
        localStorage.setItem('token', data.token);
        this._auth.isLogin.next(true);
        console.log('Registration complete');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registration successfully done',
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(data, 'Registration successfully');
      },
      error: (err) => {
        console.log(err.message);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `${err.error.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      },
    });
  }
}
