import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { OrdersByShippingDate } from '../models/ordersByShippingDate';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  URL = "http://localhost:4000/api/order";
  permission: string;
  loginData: any;
  token: string;
  headers: HttpHeaders;

  constructor(private http: HttpClient) { }

  getToken() {   
    this.loginData = JSON.parse(localStorage.loginData);
    this.permission = this.loginData.permission;
    this.token = "Bearer " + this.loginData.token; 
    this.headers = new HttpHeaders().set('authorization', this.token);
  }

  getRecentOrder(userId: number) : Observable<Order> {
    this.getToken();
    return this.http.get<Order>(`${this.URL}/${userId}/recent`, {headers: this.headers});
  }

  getAmountOfOrders() : Observable<any> {
    return this.http.get<any>(`${this.URL}/amount-of-orders`);
  }

  placeNewOrder(newOrder: Order) : Observable<Order> {
    this.getToken();
    return this.http.post<Order>(`${this.URL}/new-order`, newOrder, {headers: this.headers});
  }

  getAllOrdersByShippingDate(): Observable<OrdersByShippingDate[]> {
    this.getToken();
    return this.http.get<OrdersByShippingDate[]>(`${this.URL}/orders-by-shipping-date`, {headers: this.headers});
  }
}
