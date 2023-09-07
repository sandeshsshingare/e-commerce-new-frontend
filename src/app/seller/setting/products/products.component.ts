import { Component, OnInit } from '@angular/core';
import { SettingService } from '../service/setting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  allProducts: any[] = [];
  pageNo: number = 1;
  files: any[] = [];
  isAddProduct: boolean = false;
  data: any;
  paginationControl = {
    itemsPerPage: 5,
    page: 1,
  };
  totalResults: any;
  allController = {
    page: 1,
    limit: 5,
    sort: '',
    search: '',
  };
  constructor(private _setting: SettingService, private _router: Router) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this._setting.getProducts(this.allController).subscribe({
      next: (data: any) => {
        this.allProducts = data.results;
        console.log(data);
        this.totalResults = data.totalResults;
      },
      error: (err) => {
        console.log(err.error.message);
      },
      complete: () => {
        console.log('All products are fetched');
      },
    });
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  addProduct(data: any) {
    let formData = new FormData();

    console.log(this.files);
    for (let i = 0; i < this.files.length; i++) {
      formData.append('images', this.files[i]);
    }

    let obj = {
      name: data.name,
      description: data.about,
      price: data.price,
      images: formData,
    };

    formData.append('name', obj.name);
    formData.append('description', obj.description);
    formData.append('price', obj.price);

    this._setting.createProduct(formData).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err.error.message);
      },
      complete: () => {
        this.isAddProduct = !this.isAddProduct;
        this.getAllProducts();
      },
    });
  }

  resetForm(form: any) {
    this.isAddProduct = !this.isAddProduct;
  }

  onProductClick(id: any) {
    this._router.navigate(['setting/specific-product/' + id]);
  }
  sortByFun(data: any) {
    this.allController['sort'] = data.toLowerCase();
    this.getAllProducts();
  }
  searchFun(data: any) {
    if (data.length >= 3) {
      this.allController['search'] = data;
      this.getAllProducts();
    } else if (data.length === 0) {
      this.allController['search'] = '';
      this.getAllProducts();
    }
  }
}
