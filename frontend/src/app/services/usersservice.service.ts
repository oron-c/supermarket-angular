import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Login } from '../models/login';
import { Register } from '../models/register';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  URL = "http://localhost:4000/api/users";
  userHasLoggedIn = new EventEmitter();

  constructor(private http: HttpClient) { }

  login(userInfo: Login) : Observable<any> {   
    return this.http.post<Login>(`${this.URL}/login`, userInfo)
    .pipe(tap((value) => {
      this.userHasLoggedIn.emit(value);
    }))
  }

  register(newUser: Register) : Observable<any> {
    return this.http.post<Register>(`${this.URL}/register`, newUser)
  }

  checkIfUserIdAvailable(userId: number) : Observable<any> {
    return this.http.get(`${this.URL}/user-by-id/${userId}`)
  }

  checkIfUsernameAvailable(username: string) : Observable<any> {
    return this.http.get(`${this.URL}/user-by-username/${username}`)
  }
}
