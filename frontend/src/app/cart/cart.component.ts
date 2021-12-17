import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../models/cartItem';
import { Error } from '../models/error';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  userId: number;
  activeCartId: number;
  cartItems: CartItem[];
  totalCartAmount: number;
  amountOfItemsInCart: number;
  imageUrl = "http://localhost:4000/api/products/images/";
  error: Error;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.itemAddedToCart
      .subscribe(() => {
        this.getCartItems()
      })

    this.getActiveCart();

  }

  getActiveCart() {
    this.cartService.getActiveCart()
      .subscribe(
        data => {
          this.error = undefined;
          this.activeCartId = data.cartId
          this.getCartItems();
        },
        () => {
          this.addCart();
        }
      )
  }

  getCartItems() {
    this.cartService.getAllCartItems(this.activeCartId)
      .subscribe(
        data => {
          this.cartItems = data;
          this.error = undefined;
          this.totalCartAmount = 0;
          this.cartItems.map(item => this.totalCartAmount += item.totalPrice)
          this.amountOfItemsInCart = data.length;
        },
        err => {
          this.error = err;
          this.cartItems = undefined;
        }
      )
  }

  addCart() {
    if (localStorage.loginData) {
      this.userId = JSON.parse(localStorage.loginData).userId;
    }
    this.cartService.createNewCart(this.userId)
      .subscribe(
        () => {
          this.error = undefined;
          this.getActiveCart();
        },
        err => this.error = err
      )
  }

  removeItemFromCart(itemId: number) {
    this.cartService.removeItemFromCart(itemId)
      .subscribe(
        () => {
          this.getCartItems();
          this.error = undefined;
        },
        err => this.error = err
      )
  }

  emptyCart() {
    this.cartService.removeAllItemsFromCart(this.activeCartId)
      .subscribe(
        () => {
          this.getCartItems()
          this.error = undefined;
        },
        err => this.error = err
      )
  }

  placeOrder() {
    this.router.navigate(['order'], { state: { cartId: this.activeCartId, cartItems: this.cartItems } })
  }
}
