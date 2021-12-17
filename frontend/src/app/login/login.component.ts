import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Login } from '../models/login';
import { UsersService } from '../services/usersservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Login = new Login(undefined, undefined);
  loginForm: FormGroup;
  usernameControl: FormControl;
  passwordControl: FormControl;
  eventsSubject: Subject<void> = new Subject<void>();
  fName: string;
  error: Error;

  constructor(private loginService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.createControllers();
    this.createForm()
  }

  createControllers() {
    this.usernameControl = new FormControl("", [Validators.minLength(4), Validators.maxLength(30), Validators.email]);
    this.passwordControl = new FormControl("", [Validators.minLength(4), Validators.maxLength(30)]);
  }

  createForm() {
    this.loginForm = new FormGroup({
      usernameControl: this.usernameControl,
      passwordControl: this.passwordControl
    })
  }

  onLogin() {
    this.user.username = this.usernameControl.value;
    this.user.password = this.passwordControl.value;
    this.loginService.login(this.user)
      .subscribe(
        data=>{
          this.error = undefined;
          localStorage["loginData"] = JSON.stringify(data); 
          if(data.permission==="admin") {
            this.router.navigate(['management/products/all']);
          } 
          else {
            this.fName = data.fName;
            this.eventsSubject.next();
          }        
                   
        },
        err=>{
          this.error = err;
          localStorage.clear();
          this.eventsSubject.next();
        }
        )    
  }

  cleanError() {
    if(this.error) {
      this.error = undefined;
    }
  }

}
