import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingService } from '../service/setting.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private _setting: SettingService
  ) {}
  token: any;
  ngOnInit(): void {
    this.token = this.activeRoute.snapshot.queryParams['token'];

    this.verifyEmail();
  }

  verifyEmail() {
    this._setting.verify(this.token).subscribe({
      next: (data) => {},
      error: (err) => {
        console.log(err.error.message);
      },
      complete: () => {
        this.router.navigate(['setting/profile']);
      },
    });
  }
}
