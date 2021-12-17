import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../models/category';
import { Error } from '../models/error';
import { Product } from '../models/product';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  showCart: boolean = true;
  showSmallScreenMenu: boolean = false;
  loginData: any;
  permission: string;
  categories: Category[];
  products: Product[];
  productToFind: string;
  error: Error;

  constructor(private categoriesService: CategoriesService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.loginData) {
      this.loginData = JSON.parse(localStorage.loginData);
      this.permission = JSON.parse(localStorage.loginData).permission;
    }

    this.categoriesService.getAllCategories()
      .subscribe(
        data => {
          this.error = undefined;
          this.categories = data;
        },
        err => {
          this.error = err;
          this.categories = undefined;
        })
  }

  showOrHideCart() {
    if (this.showCart)
      this.showCart = false;
    else
      this.showCart = true;
  }

  showOrHideSmallMenu() {
    if (this.showSmallScreenMenu)
      this.showSmallScreenMenu = false;
    else
      this.showSmallScreenMenu = true;
  }

  findProductByName() {
    this.router.navigate([`/main/products/by-search/${this.productToFind}`], { state: { productToFind: this.productToFind } });
    this.productToFind = "";
  }


}
