import { Component } from '@angular/core';
import { SettingService } from '../service/setting.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  productData: any[] = [];
  orderData: any[] = [];
  months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  isShow: boolean = false;
  constructor(private _setting: SettingService) {
    this.getDetails();
  }

  getDetails() {
    this._setting.getCategoryDetails()?.subscribe({
      next: (data: any) => {
        let arr: [] = data.results.product;
        this.orderData = data.results.order;
        arr.forEach((data: any) => {
          let obj = { name: data.name, value: data.value };
          this.productData.push(obj);
        });
        console.log(this.productData);

        console.log(this.orderData);
        this.isShow = true;
      },
    });
  }
}
