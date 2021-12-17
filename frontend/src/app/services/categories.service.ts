import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  URL = "http://localhost:4000/api/products/categories";
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

  getAllCategories() {
    this.getToken();  
    return this.http.get<Category[]>(`${this.URL}/all`, {headers: this.headers}) as Observable<Category[]>
  }


}
