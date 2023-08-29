import { Component } from '@angular/core';
import { SettingService } from '../service/setting.service';

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
      },
      complete: () => {
        console.log('Updated successfully');
      },
    });
  }
}
