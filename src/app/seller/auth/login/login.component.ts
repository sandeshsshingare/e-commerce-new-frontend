import { Component } from '@angular/core';
import { AuthService } from '../authServices/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private _auth: AuthService, private _router: Router) {
    this._auth.isLogin.subscribe({
      next: (data) => {
        if (data) {
          this._router.navigate(['setting/profile']);
        }
      },
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
}
