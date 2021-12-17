import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Error } from '../models/error';
import { Login } from '../models/login';
import { NewUserLoginInfo, Register } from '../models/register';
import { UsersService } from '../services/usersservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  citiesList = [{
    cityId: 1, cityName: "Jerusalem"}, {cityId: 2, cityName: "Tel Aviv"}, 
    {cityId: 3, cityName: "Hifa"}, {cityId: 4, cityName: "Rishon Letzion"}, 
    {cityId: 5, cityName: "Petah Tikva"}, {cityId: 6, cityName: "Ashdod"},
    {cityId: 7, cityName: "Netanya"}, {cityId: 8, cityName: "Bnei Brak"}, 
    {cityId: 9, cityName: "Beer Sheva"}, {cityId: 10, cityName: "Holon"}];
  newUserLoginInfo: NewUserLoginInfo;
  newUser: Register = new Register(undefined,undefined,undefined,undefined,undefined,undefined,undefined)
  registerForm: FormGroup;
  firstNameControl: FormControl;
  lastNameControl: FormControl;
  cityControl: FormControl;
  streetControl: FormControl;
  error: Error;

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    if(!history.state.user){
      this.router.navigate(['/new-user-login-info'])
    }
    this.newUserLoginInfo = history.state.user; 
    
      this.createControllers();
      this.createForm();
  }

  createControllers() {
    this.firstNameControl = new FormControl("", [Validators.minLength(2), Validators.maxLength(30)]);
    this.lastNameControl = new FormControl("", [Validators.minLength(2), Validators.maxLength(30)]);
    this.cityControl = new FormControl;
    this.streetControl = new FormControl("", [Validators.minLength(4), Validators.maxLength(30)]);
  }

  createForm() {
    this.registerForm = new FormGroup({
      firstNameControl: this.firstNameControl,
      lastNameControl: this.lastNameControl,
      cityControl: this.cityControl,
      streetControl: this.streetControl
    })
  }

  register() {
    this.newUser.userId = this.newUserLoginInfo.userId;
    this.newUser.username = this.newUserLoginInfo.username; 
    this.newUser.password = this.newUserLoginInfo.password;
    this.newUser.fName = this.firstNameControl.value;
    this.newUser.lName = this.lastNameControl.value;
    this.newUser.city = this.cityControl.value;
    this.newUser.street = this.streetControl.value; 

    this.userService.register(this.newUser)
      .subscribe(
        () => {
          this.error = undefined;
          this.login();
        },
        err => this.error = err       
      )
  }

  login() {
    const user = new Login(this.newUser.username, this.newUser.password);
    this.userService.login(user)
      .subscribe(
        data=>{
          this.error = undefined;
          localStorage["loginData"] = JSON.stringify(data);
          this.router.navigate(['login'], {state: {data: data}});             
        },
        err => {
          this.error = err;
          localStorage.clear();
        }
      )
  }

}
