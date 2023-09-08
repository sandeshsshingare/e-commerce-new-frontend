import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  isMobile: boolean = false;
  isDropdown: boolean = false;
  isLogin: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
