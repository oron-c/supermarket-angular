import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewUserLoginInfo } from '../models/register';
import { UsersService } from '../services/usersservice.service';

@Component({
  selector: 'app-new-user-login-info',
  templateUrl: './new-user-login-info.component.html',
  styleUrls: ['./new-user-login-info.component.css']
})
export class NewUserLoginInfoComponent implements OnInit {

  newUser: NewUserLoginInfo = new NewUserLoginInfo(undefined, undefined, undefined);
  newUserLoginInfoForm: FormGroup;
  userIdControl: FormControl;
  usernameControl: FormControl;
  passwordControl: FormControl;
  confirmPasswordControl: FormControl;
  userNameIsTaken: boolean;
  userIdIsTaken: boolean;

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.createControllers();
    this.createForm();
  }

  createControllers() {
    this.userIdControl = new FormControl("", [Validators.minLength(6), Validators.maxLength(9), Validators.pattern("^[0-9]*$")]);
    this.usernameControl = new FormControl("", [Validators.email, Validators.minLength(4), Validators.maxLength(30)]);
    this.passwordControl = new FormControl("", [Validators.minLength(4), Validators.maxLength(30)]);
    this.confirmPasswordControl = new FormControl("", [Validators.minLength(4), Validators.maxLength(30)]);
  }

  createForm() {
    this.newUserLoginInfoForm = new FormGroup({
      userIdControl: this.userIdControl,
      usernameControl: this.usernameControl,
      passwordControl: this.passwordControl,
      confirmPasswordControl: this.confirmPasswordControl
    })
  }

  goToRegister() {
    this.newUser.userId = this.userIdControl.value;
    this.newUser.username = this.usernameControl.value;
    this.newUser.password = this.passwordControl.value;
    this.checkIfUserIdAvailable();
  }

  checkIfUserIdAvailable() {
    this.usersService.checkIfUserIdAvailable(this.userIdControl.value)
      .subscribe(
        () => this.userIdIsTaken = true,
        () => {
          this.userIdIsTaken = false;
          this.checkIfUsernameAvailable();
        })
  }
  checkIfUsernameAvailable() {
    this.usersService.checkIfUsernameAvailable(this.usernameControl.value)
      .subscribe(
        () => this.userNameIsTaken = true,
        () => {
          this.userNameIsTaken = false;
          this.router.navigate(['/register'], { state: { user: this.newUser } });
        })
  }

}
