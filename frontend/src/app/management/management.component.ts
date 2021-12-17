import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../models/category';
import { Error } from '../models/error';
import { Product } from '../models/product';
import { CategoriesService } from '../services/categories.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  categories: Category[];
  productToFind: string;
  productToEdit: Product;
  addProduct: boolean = false;
  showSmallScreenMenu: boolean = false;
  error: Error;

  constructor(private categoriesService: CategoriesService, private productService: ProductsService, private router: Router) { }

  ngOnInit(): void {

    this.productService.launchEditComponent
    .subscribe(data => {
      this.addProduct = false;
      this.productToEdit = data;
      this.error = undefined;   
    },
    err => {
      this.error = err;
      this.productToEdit = undefined;
    })

    this.categoriesService.getAllCategories()
    .subscribe(
      data => {
        this.categories = data;
        this.error = undefined;
      },
      err => {
        this.error = err;
        this.categories = undefined;
      }       
    )
  }
  
  findProductByName() {
    this.router.navigate([`/management/products/by-search/${this.productToFind}`], {state : {productToFind: this.productToFind}});
    this.productToFind = "";    
  }

  hideEditComponent() {
    this.productToEdit = undefined;
  }

  showAddProduct() {
    this.addProduct = true;
    this.productToEdit = undefined;
  }

  hideAddComponent() {
    this.addProduct = false;
  }

  showOrHideSmallMenu() {
    if (this.showSmallScreenMenu)
      this.showSmallScreenMenu = false;
    else
      this.showSmallScreenMenu = true;
  }

}
