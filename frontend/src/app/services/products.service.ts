import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  URL = "http://localhost:4000/api/products";
  permission: string;
  loginData: any;
  token: string;
  headers: HttpHeaders;
  launchEditComponent = new EventEmitter();
  refreshProductsView = new EventEmitter();
  categoryHasChanged = new EventEmitter();

  constructor(private http: HttpClient) { }

  getToken() {
    this.loginData = JSON.parse(localStorage.loginData);
    this.permission = this.loginData.permission;
    this.token = "Bearer " + this.loginData.token;
    this.headers = new HttpHeaders().set('authorization', this.token);
  }

  getAllProducts() {
    this.getToken();
    return this.http.get<Product[]>(`${this.URL}/all`, { headers: this.headers }) as Observable<Product[]>;
  }

  getAmountOfProducts(): Observable<any> {
    return this.http.get<any>(`${this.URL}/amount-of-products`);
  }

  getProductsByCategoryId(categoryId: number): Observable<Product[]> {
    this.getToken();
    return this.http.get<Product[]>(`${this.URL}/category-id/${categoryId}`, { headers: this.headers })
  }

  add(newProduct: FormData): Observable<Product> {
    this.getToken();
    return this.http.post<Product>(`${this.URL}/new`, newProduct, { headers: this.headers })
      .pipe(tap(() => {
        this.refreshProductsView.emit()
      }))
  }

  edit(productToEdit: FormData, productId: number): Observable<Product> {
    this.getToken();
    return this.http.put<Product>(`${this.URL}/${productId}`, productToEdit, { headers: this.headers })
      .pipe(tap(() => {
        this.refreshProductsView.emit()
      }))
  }

  getProductByProductId(productId: number): Observable<Product> {
    this.getToken();
    return this.http.get<Product>(`${this.URL}/product-by-id/${productId}`, { headers: this.headers })
      .pipe(tap((value) => {
        this.launchEditComponent.emit(value)
      }))
  }

  getProductByName(productName: string): Observable<Product[]> {
    this.getToken();
    return this.http.get<Product[]>(`${this.URL}/by-product-name/${productName}`, { headers: this.headers });
  }

}




