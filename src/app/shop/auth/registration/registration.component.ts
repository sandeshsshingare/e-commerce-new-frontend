import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  constructor(private _auth: AuthService, private _router: Router) {}
  flag: boolean = false;
  @ViewChild(NotificationComponent) nc!: NotificationComponent;

  // ngAfterViewInit(): void {
  //   console.log(this.nc);
  //   console.log(
  //     this.nc.alert('Success', 'Registration successfully', true, false, true)
  //   );
  // }

  resetForm(form: any) {
    this._router.navigate(['/shop']);
    form = form.reset();
  }

  signUp(data: any) {
    if (data['password'] !== data['confirm-password']) {
      this.nc.alert('Error', 'Please confirm your password', true, true);

      return;
    }
    let obj = {
      email: data['email'],
      password: data['password'],
      name: data['first-name'] + ' ' + data['last-name'],
      address: {
        street: data['street-address'],
        addressLine2: data['addressLine2'],
        city: data['city'],
        state: data['state'],
        pin: data['postal-code'],
      },
    };
    console.log(data);

    this._auth.signUp(obj).subscribe({
      next: (data: any) => {
        console.log(data);
        localStorage.setItem('customerToken', data.token);
      },
      error: (err: any) => {
        this.nc.alert('Error', err.error.message, true, true);
      },
      complete: () => {
        this.nc.alert(
          'Success',
          'Registration successfully',
          true,
          false,
          true
        );
        this._router.navigate(['/shop/setting/profile']);
      },
    });
  }
}
