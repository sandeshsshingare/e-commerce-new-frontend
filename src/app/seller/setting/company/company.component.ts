import { Component } from '@angular/core';
import { SettingService } from '../service/setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent {
  constructor(private _setting: SettingService) {
    this.getOrgData();
  }
  isEdit: boolean = false;
  orgData: any;
  getOrgData() {
    this._setting.sellerGetProfile().subscribe({
      next: (data: any) => {
        this.orgData = data._org;
        console.log(data);
      },
      error: (errr) => {
        console.log(errr);
      },
      complete: () => console.log('completed'),
    });
  }
  editSave(data: any) {
    this.isEdit = !this.isEdit;
    let obj = {
      email: data.email,
      name: data.companyName,
    };
    this._setting.editOrg(obj).subscribe({
      next: (data: any) => {
        this.orgData = data;
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      },
      complete: () => {
        console.log('Updated successfully');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Update successfully ',
          showConfirmButton: false,
          timer: 1500,
        });
      },
    });
  }
}
