import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authServices/auth.service';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isForgot: boolean = false;
  forgotEmail!: string;
  user:any;
  loggedIn : any
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private authService: SocialAuthService

  ) {
    this._auth.isLogin.subscribe({
      next: (data) => {
        if (data) {
          this._router.navigate(['setting/profile']);
        }
      },
    });
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
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
