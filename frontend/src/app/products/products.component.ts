import { Location } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Category } from '../models/category';
import { Error } from '../models/error';
import { Product } from '../models/product';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  @ViewChild('callQuantityDialog') callQuantityDialog: TemplateRef<any>;
  permission: string;
  category: Category;
  categoryId: number
  products: Product[];
  imageUrl = "http://localhost:4000/api/products/images/";
  activeCartId: number;
  productToFind: string;
  noProductsToShow: boolean = false;
  searchedProductWasNotFound: boolean = false;
  error: Error;
  productToAddToCart: Product;
  quantityToAdd: number;

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.productService.refreshProductsView
      .subscribe(() => {
        this.getAllProducts();
      })

    this.cartService.newCartWasCreated
      .subscribe(() => {
        this.getActiveCart();
      })

    this.route.params
      .subscribe((param: Params) => {
        this.error = undefined;
        if(param['categoryId'] === "all") {
          this.getAllProducts();
        }
        else if (param['categoryId'] === "by-search") {
          if (param['productName']) {
            this.productToFind = history.state.productToFind;
            this.getProductByProductName(history.state.productToFind)
          }
          else {
            this.location.back();
          }
        }
        else {
          this.categoryId = param['categoryId'];
          this.getAllProductsByCategory()
        }
      },
        err => {
          this.products = undefined;
          this.error = err
        }
        );

    if (localStorage.loginData) {
      this.permission = JSON.parse(localStorage.loginData).permission;
    }

    if (this.permission === `user`) {
      this.getActiveCart();
    }

  }

  getActiveCart() {
    this.cartService.getActiveCart()
    .subscribe(
      data => this.activeCartId = data.cartId,
    )
  }

  getAllProductsByCategory() {
    this.productService.getProductsByCategoryId(this.categoryId)
      .subscribe(
        data => {
          this.products = data;
          this.noProductsToShow = false;
          this.searchedProductWasNotFound = false;
          this.error = undefined;
        },
        err => {
            this.error = undefined;
            this.products = undefined;
            this.searchedProductWasNotFound = false;
            this.noProductsToShow = true;
            if(err.status!==404)
              this.error=err;
        })
  }

  addToCart(product: Product, quantity: number) {
    this.cartService.addProductToCart(product, quantity, this.activeCartId)
      .subscribe(
        () => this.error = undefined,
        err => this.error = err
      )
  }

  getProductByProductName(productName: string) {
    this.productService.getProductByName(productName)
      .subscribe(data => {
        this.products = data;
        this.noProductsToShow = false;
        this.searchedProductWasNotFound = false;
        this.error = undefined;
      },
      err => {
          this.error = undefined;
          this.products = undefined;
          this.noProductsToShow = false;
          this.searchedProductWasNotFound = true;

          if(err.status!==404)
            this.error = err;
      }
      )
  }

  getAllProducts() {
    this.productService.getAllProducts()
      .subscribe(data => {
        this.products = data;
        this.noProductsToShow = false;
        this.searchedProductWasNotFound = false;
        this.error = undefined;
      },
      err => {
          this.error = undefined;
          this.products = undefined;
          this.noProductsToShow = true;
          this.searchedProductWasNotFound = false;
        
          if(err.status!==404)
            this.error = err;
      }
      )
  }

  openEditComponent(productIdToEdit: number) {
    this.productService.getProductByProductId(productIdToEdit).subscribe(
      () => this.error = undefined,
      err => this.error = err
    )
  }

  openQuantityModal(product: Product) {
    this.quantityToAdd = 0;
    this.productToAddToCart = product;
    this.dialog.open(this.callQuantityDialog);
  }

  quantityPlus() {
    this.quantityToAdd ++;
  }

  quantityMinus() {
    this.quantityToAdd --;
  }

  cardHasClicked(product: Product) {
    if(this.permission==='user')
      this.openQuantityModal(product);
    else if(this.permission==='admin')
      this.openEditComponent(product.productId);
  }

}
