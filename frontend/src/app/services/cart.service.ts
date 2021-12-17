import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cartItem';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  URL = "http://localhost:4000/api/cart";
  permission: string;
  itemAddedToCart = new EventEmitter();
  newCartWasCreated = new EventEmitter();
  loginData: any;
  token: string;
  headers: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {  
    if (!localStorage.loginData) {
      this.router.navigate(['login']);
    }

    this.loginData = JSON.parse(localStorage.loginData);
    this.permission = this.loginData.permission;
    this.token = "Bearer " + this.loginData.token;

    this.headers = new HttpHeaders().set('authorization', this.token);
  }

  getActiveCart() {
    this.getToken();
    return this.http.get<Cart>(`${this.URL}/${this.loginData.userId}/my-cart`, { headers: this.headers }) as Observable<Cart>
  }

  createNewCart(userId: number) : Observable<Cart> {
    const newCart = new Cart(undefined, userId, this.formatDate(), 1);
    return this.http.post<Cart>(`${this.URL}/new-cart`, newCart, { headers: this.headers })
    .pipe(tap((value) => {
      this.newCartWasCreated.emit(value);
    }))
  }

  getAllCartItems(cartId: number) {
    return this.http.get<CartItem[]>(`${this.URL}/${cartId}/my-cart-items`, { headers: this.headers }) as Observable<CartItem[]>
  }

  addProductToCart(product: Product, quantity: number, cartId: number): Observable<CartItem> {
    const newCartItem = new CartItem(undefined, product.productId, quantity, product.price * quantity, cartId, undefined, undefined); 
    return this.http.post<CartItem>(`${this.URL}/${cartId}/add-to-cart`, newCartItem, { headers: this.headers })
      .pipe(tap((value) => {
        this.itemAddedToCart.emit(value);
      }))
  }

  removeItemFromCart(itemId: number) {
    return this.http.delete<number>(`${this.URL}/${itemId}/remove-from-cart`, { headers: this.headers }) as Observable<number>
  }

  removeAllItemsFromCart(cartId: number) {
    return this.http.delete<number>(`${this.URL}/${cartId}/remove-all-items-from-cart`, { headers: this.headers }) as Observable<number>
  }
 
  deactivateCard(cartId: number) {
    return this.http.patch<number>(`${this.URL}/${cartId}/order-complete`, {}, { headers: this.headers }) as Observable<number>
  }

  private addZeroToDate(num: number) {
    return num < 10 ? `0${num}` : num.toString();
  }

  private formatDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = this.addZeroToDate(date.getMonth() + 1);
    const day = this.addZeroToDate(date.getDate());
    return `${year}-${month}-${day}`;
  }

}
