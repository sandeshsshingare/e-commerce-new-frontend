import { Component } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent {
  isMobile: boolean = false;
  isDropdown: boolean = false;
  isLogin: boolean = false;
}
