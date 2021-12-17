import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../models/category';
import { Error } from '../models/error';
import { Product } from '../models/product';
import { CategoriesService } from '../services/categories.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  @Output() hideAddProductComponentManagement = new EventEmitter();
  productToAdd: Product = new Product(undefined, undefined, undefined, undefined, undefined);
  categoriesList: Category[];
  addProductForm: FormGroup;
  productNameControl: FormControl;
  categoryIdControl: FormControl;
  productPriceControl: FormControl;
  imageControl: FormControl;
  error: Error;

  constructor(
    private productService: ProductsService,
    private categoriesService: CategoriesService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.categoriesService.getAllCategories()
      .subscribe(
        data => {
          this.error = undefined;
          this.categoriesList = data;
        },
        err => {
          this.error = err;
          this.categoriesList = undefined;
        }        
      )
    this.createControllers();
    this.createForm()
  }

  createControllers() {
    this.productNameControl = new FormControl("", [Validators.minLength(2), Validators.maxLength(30)]);
    this.categoryIdControl = new FormControl("");
    this.productPriceControl = new FormControl("", Validators.min(0.1));
    this.imageControl = new FormControl;
  }

  createForm() {
    this.addProductForm = new FormGroup({
      productNameControl: this.productNameControl,
      categoryIdControl: this.categoryIdControl,
      productPriceControl: this.productPriceControl,
      imageControl: this.imageControl
    })
  }

  addProduct() {
    this.productToAdd.productName = this.productNameControl.value;
    this.productToAdd.categoryId = this.categoryIdControl.value;
    this.productToAdd.price = this.productPriceControl.value;
    
    const fd=Product.convertToFormData(this.productToAdd);

    this.productService.add(fd)
      .subscribe(
        () => {
          this.error = undefined;
          this.hideAddProduct();
          this.router.navigate(['management/products/all']);    
        },
        err => {
          this.error = err;
        }
      )
  }

  saveImage(args:Event) : void {
    this.productToAdd.image=(args.target as HTMLInputElement).files;
}

hideAddProduct() {
  this.hideAddProductComponentManagement.emit();
}

}
