import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { Error } from '../models/error';
import { Order } from '../models/order';
import { CartService } from '../services/cart.service';
import { OrdersService } from '../services/orders.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css']
})
export class GreetingComponent implements OnInit {

  @Input() events: Observable<void>;
  loginData: any
  userId: number;
  firstName: string;
  activeCart: Cart;
  activeCartId: number;
  noActiveCart: boolean = false;
  noRecentPurchase: boolean = false;
  recentOrder: Order;
  numberOfProductsInStore: number;
  numberOfOrdersSoFar: number;
  totalActiveCartAmount: number;
  numberOfCartItems: number;
  numberOfProductsInCart: number;
  error: Error;

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {

    if (history.state.data && localStorage.loginData) {
      this.loginData = JSON.parse(localStorage.loginData);
      this.firstName = this.loginData.fName;
      this.userId = this.loginData.userId;
      this.getActiveCartDetails();
    }

    this.events.subscribe(() => {
      if (localStorage.loginData) {
        this.loginData = JSON.parse(localStorage.loginData);
        this.firstName = this.loginData.fName;
        this.userId = this.loginData.userId;
        this.getActiveCartDetails();
        if (!this.numberOfProductsInStore) {
          this.getAmountOfProducts();
        }
        if (!this.numberOfOrdersSoFar) {
          this.getAmountOfOrders();
        }
      }
      else {
        this.router.navigate(['login']);
      }
    });

    this.getAmountOfProducts();
    this.getAmountOfOrders();

  }

  getActiveCartDetails() {
    this.cartService.getActiveCart()
      .subscribe(
        data => {
          this.error = undefined;
          this.activeCart = data;
          this.activeCartId = data.cartId;
          this.getActiveCartItemsAmountAndTotalPrice();
        },
        err => {
          if (err.status === 404) {
            this.error = undefined;
            this.noActiveCart = true;
            this.getUsersRecentOrder();
          }
          else {
            this.error = err;
          }
        }
      )
  }

  getUsersRecentOrder() {
    this.ordersService.getRecentOrder(this.userId)
      .subscribe(
        data => {
          this.error = undefined;
          this.recentOrder = data
        },
        err => {
          if (err.status === 404) {
            this.error = undefined;
            this.noRecentPurchase = true;
          }
          else {
            this.error = err;
          }
        }
      )
  }

  startNewCart() {
    this.cartService.createNewCart(this.userId)
      .subscribe(
        () => {
          this.error = undefined;
          this.getActiveCartDetails();
          this.router.navigate(['/main/products/all'], { state: { data: this.activeCart } })
        },
        err => this.error = err
      )
  }

  getAmountOfProducts() {
    this.productsService.getAmountOfProducts()
      .subscribe(
        data => {
          this.error = undefined;
          this.numberOfProductsInStore = data.amountOfProducts
        },
        err => this.error = err
      )
  }

  getAmountOfOrders() {
    this.ordersService.getAmountOfOrders()
      .subscribe(
        data => {
          this.error = undefined;
          this.numberOfOrdersSoFar = data.amountOfOrders
        },
        err => this.error = err

      )
  }

  getActiveCartItemsAmountAndTotalPrice() {
    this.cartService.getAllCartItems(this.activeCartId)
      .subscribe(
        data => {
          this.error = undefined;
          const cartItems = data;
          this.totalActiveCartAmount = 0;
          this.numberOfCartItems = 0;
          cartItems.map(item => {
            this.totalActiveCartAmount += item.totalPrice,
              this.numberOfCartItems += item.quantity
          })
          this.numberOfProductsInCart = cartItems.length;
        },
        err => this.error = err
      )
  }

}
