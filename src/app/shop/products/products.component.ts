import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  allProducts: any[] = [];
  allController = {
    page: 1,
    limit: 5,
    search: '',
    sort: '',
  };
  totalResults: any;

  constructor(private _shop: ShopService, private _router: Router) {}

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this._shop.getAllProducts().subscribe({
      next: (data: any) => {
        this.allProducts = data.results;
        console.log(this.allProducts);
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  onProductClick(id: any) {
    this._router.navigate([`shop/product/${id}`]);
  }
}
