import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../authServices/auth.service';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  isForgot: boolean = false;
  forgotEmail!: string;
  user: any;
  loggedIn: any;
  captcha: any;
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private authService: SocialAuthService,
    private _http: HttpClient
  ) {
    this._auth.isLogin.subscribe({
      next: (data) => {
        if (data) {
          this._router.navigate(['setting/profile']);
        }
      },
    });
  }

  ngAfterViewInit(): void {
    this._auth.getCaptcha().then((data) => {
      this.captcha = data;
      console.log(this.captcha);
    });
    console.log(this.captcha);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      // console.log(this.user.email, ' From User');
      this.loggedIn = user != null;

      let obj = {
        email: this.user.email,
        captcha: this.captcha,
        idToken: this.user.idToken,
      };

      this._auth.signInWithGoogle(obj).subscribe((data: any) => {
        console.log(data);
        let token = localStorage.getItem('token');
        if (token === '123') {
          localStorage.removeItem('token');
          return this._auth.isLogin.next(false);
        }
        localStorage.setItem('token', data.token);
        this._router.navigateByUrl('setting/profile');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Login successfully done',
          showConfirmButton: false,
          timer: 1500,
        });
      });
    });
  }
  googleSignIn() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      console.log(this.user);
    });
  }

  email: string = '';
  password: string = '';

  login() {
    // alert(this.email + this.password);
    let obj = {
      email: this.email,
      password: this.password,
    };
    console.log(obj);
    this._auth.sellerLogin(obj).subscribe({
      next: (data: any) => {
        console.log(data);

        localStorage.setItem('token', data.token);
        this._auth.isLogin.next(true);
        this._router.navigateByUrl('setting/profile');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Login successfully done',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      error: (err) => {
        console.error(err.message);
      },
    });
  }
  forgotEmailFun() {
    this._auth.forgotEmailS(this.forgotEmail).subscribe({
      next: (data) => {
        console.log('email sent successfully');
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }
}
