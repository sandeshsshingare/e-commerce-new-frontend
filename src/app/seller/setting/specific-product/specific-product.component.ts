import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingService } from '../service/setting.service';
import Swal from 'sweetalert2';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-specific-product',
  templateUrl: './specific-product.component.html',
  styleUrls: ['./specific-product.component.css'],
})
export class SpecificProductComponent implements OnInit {
  productId: any;
  productInfo: any;
  currentImg: any;
  productImgs: any[] = [];
  isOnDealDiv: boolean = false;
  discount: any;
  isAddDeal: boolean = false;
  ends: any;
  files: any = [];
  deleteImages: any[] = [];
  isEditImg: boolean = false;
  isUpdateProduct: boolean = false;
  constructor(
    private _acitveR: ActivatedRoute,
    private _setting: SettingService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.productId = this._acitveR.snapshot.params['id'];
    console.log(this.productId);
    this.getSpecificProduct();
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,

    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  getSpecificProduct() {
    this._setting.getOneProudct(this.productId).subscribe((data: any) => {
      this.productInfo = data.data;

      console.log(this.productInfo);
      this.currentImg = this.productInfo.images[0].url;
      this.productImgs = this.productInfo.images;
    });
  }

  imageSelect(public_id: any) {
    if (this.deleteImages.includes(public_id)) {
      let a = this.deleteImages.indexOf(public_id);
      this.deleteImages.splice(a, 1);
      console.log(this.deleteImages);
    } else {
      this.deleteImages.push(public_id);
    }
  }

  editOrDeleteImg() {}

  saveNewImg() {
    let deleteArr: any = [];
    let formData = new FormData();
    this.deleteImages.forEach((data) => {
      let obj: any = {
        public_id: data,
      };
      deleteArr.push(obj);
      formData.append('delete', JSON.stringify(obj));
    });
    this.files.forEach((element: any) => {
      formData.append('new_images', element);
    });

    console.log(formData);

    this._setting.updateProductImage(formData, this.productId).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err.error.message);
      },
      complete: () => {
        this.getSpecificProduct();
        this.files.length = 0;
        this.isEditImg = !this.isEditImg;
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

  deleteProduct() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._setting.deleteProduct(this.productId).subscribe({
          next: (data) => {
            console.log('Product deleted successfully');
          },
        });
        this._router.navigate(['setting/products']);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  resetForm(data: any) {
    this.isUpdateProduct = !this.isUpdateProduct;
  }

  updateProduct(data: any) {
    console.log(data);
    let obj = {
      name: data.name,
      description: data.about,
      price: data.price,
      category: data.category,
    };
    this._setting.updateProduct(obj, this.productId).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err.error.message);
      },
      complete: () => {
        this.getSpecificProduct();
        this.isUpdateProduct = !this.isUpdateProduct;
      },
    });
  }

  addDeal() {
    let ends = this.ends.toString();
    this._setting
      .addDeal(this.productId, {
        discount: this.discount,
        ends: ends,
      })
      .subscribe({
        next: (data: any) => {
          this.productInfo = data.results;
          console.log(this.productInfo);
        },
        error: (err) => {
          alert(err.error.message);
        },
        complete: () => {
          // this.getSpecificProduct();
          this.isAddDeal = false;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Deal added successfully',
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
  }

  removeDeal(deal_id: any) {
    this._setting.removeDeal(deal_id).subscribe({
      next: (data) => {},
      error: (err) => {
        alert(err.error.message);
      },
      complete: () => {
        this.getSpecificProduct();
      },
    });
  }
}
