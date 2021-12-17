import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../models/category';
import { Error } from '../models/error';
import { Product } from '../models/product';
import { CategoriesService } from '../services/categories.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  @Input() productToEdit: Product;
  @Output() hideEditComponetntFromManagement = new EventEmitter();
  categoriesList: Category[];
  editProductForm: FormGroup;
  productNameControl: FormControl;
  categoryIdControl: FormControl;
  productPriceControl: FormControl;
  imageControl: FormControl;
  idToEdit: number;
  error: Error;

  constructor(
    private productService: ProductsService,
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
    this.productService.launchEditComponent
      .subscribe(data => {
        this.productToEdit = data;
        this.error = undefined;
        this.createControllers();
        this.createForm();
      },
      err => {
        this.error = err;
        this.productToEdit = undefined;
      })

    this.categoriesService.getAllCategories()
      .subscribe(
        data => {
          this.categoriesList = data;
          this.error = undefined;
        },
        err => {
          this.error = err;
          this.categoriesList = undefined;
        }
      );

    this.createControllers();
    this.createForm();

  }

  createControllers() {
    this.productNameControl = new FormControl(this.productToEdit?.productName, [Validators.minLength(2), Validators.maxLength(30)]);
    this.categoryIdControl = new FormControl(this.productToEdit?.categoryId);
    this.productPriceControl = new FormControl(this.productToEdit.price, Validators.min(0.1));
    this.imageControl = new FormControl();
  }

  createForm() {
    this.editProductForm = new FormGroup({
      productNameControl: this.productNameControl,
      categoryIdControl: this.categoryIdControl,
      productPriceControl: this.productPriceControl,
      imageControl: this.imageControl
    })
  }

  editProduct() {
    this.productToEdit.productName = this.productNameControl.value;
    this.productToEdit.categoryId = this.categoryIdControl.value;
    this.productToEdit.price = this.productPriceControl.value;

    const fd = Product.convertToFormData(this.productToEdit);
    
    this.productService.edit(fd, this.productToEdit.productId)
      .subscribe(
        () => {
          this.error = undefined;
          this.hideEditComponent();
        },
        err => this.error = err
      )
  }

  saveImage(args: Event): void {
    this.productToEdit.image = (args.target as HTMLInputElement).files;
  }

  hideEditComponent() {
    this.hideEditComponetntFromManagement.emit();
  }

}
