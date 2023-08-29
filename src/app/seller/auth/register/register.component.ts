import { Component } from '@angular/core';
import { AuthService } from '../authServices/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private _auth: AuthService, private _router: Router) {
    this._auth.isLogin.subscribe({
      next: (data) => {
        if (data) {
          this._router.navigate(['setting/profile']);
        }
      },
    });
  }
  registerData(data: any) {
    this._auth.sellerRegister(data).subscribe({
      next: (data: any) => {
        localStorage.setItem('token', data.token);
        this._auth.isLogin.next(true);
        console.log('Registration complete');
        console.log(data, 'Registration successfully');
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
}
