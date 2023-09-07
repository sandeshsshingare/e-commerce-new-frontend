import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
   notificationController = {
    
  }
  notificationMessage: string = '';
  notificationTitle: string = '';
  flag: boolean = false;

  resetForm(form: any) {
    form = form.reset();
  }

  signUp(data: any) {
    if (data['password'] !== data['confirm-password']) {
      this.notificationMessage = 'Please confirm your password';
      this.notificationTitle = 'Error';

      this.flag = true;
      setTimeout(() => {
        this.flag = false;
      }, 3000);
      return;
    }
    let obj = {
      email: data['email'],
      password: data['password'],
      name: data['first-name'] + data['last-name'],
      address: {
        street: data['street-address'],
        addressLine2: data['addressLine2'],
        city: data['city'],
        state: data['state'],
        pin: data['postal-code'],
      },
    };
    console.log(data);
  }
}
