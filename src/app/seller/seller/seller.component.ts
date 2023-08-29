import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/authServices/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
})
export class SellerComponent implements OnInit {
  isLoginData: boolean = false;
  profileData: any;
  mobileToggle: any = false;
  profileToggle: boolean = false;

  constructor(private _auth: AuthService, private router: Router) {}
  ngOnInit(): void {
    this._auth.isLoggedIn().then((data: any) => {
      this.profileData = data;
      // this.isLoginData = data?.isAccess;
      if (!data.isAccess) {
        this.router.navigate(['auth/login']);
      }
    });
    this._auth.isLogin.subscribe({
      next: (data) => {
        this.isLoginData = data;
      },
    });
  }
  signOut() {
    localStorage.removeItem('token');
    this._auth.isLogin.next(false);

    this.router.navigateByUrl('auth/login');
  }
  toggle() {
    if (this.profileToggle) {
      this.profileToggle = !this.profileToggle;
    }
  }
}
