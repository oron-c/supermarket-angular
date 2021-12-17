import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CartItem } from '../models/cartItem';
import { Order } from '../models/order';
import { OrdersByShippingDate } from '../models/ordersByShippingDate';
import { CartService } from '../services/cart.service';
import { OrdersService } from '../services/orders.service';
import { saveAs } from 'file-saver';
import { Error } from '../models/error';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @ViewChild('callOrderCompleteDialog') callOrderCompleteDialog: TemplateRef<any>;
  citiesList = [
    { cityId: 1, cityName: "Jerusalem" }, { cityId: 2, cityName: "Tel Aviv" },
    { cityId: 3, cityName: "Hifa" }, { cityId: 4, cityName: "Rishon Letzion" },
    { cityId: 5, cityName: "Petah Tikva" }, { cityId: 6, cityName: "Ashdod" },
    { cityId: 7, cityName: "Netanya" }, { cityId: 8, cityName: "Bnei Brak" },
    { cityId: 9, cityName: "Beer Sheva" }, { cityId: 10, cityName: "Holon" }];
  loginData: any;
  cartId: number;
  cartItems: CartItem[];
  totalCartAmount: number = 0;
  orderForm: FormGroup;
  cityControl: FormControl;
  streetControl: FormControl;
  shippingDateControl: FormControl;
  creditCardControl: FormControl;
  newOrder: Order;
  ordersByShippingDate: OrdersByShippingDate[];
  isDateAvailable: boolean = true;
  productToFind: string;
  last4CreditCard: number;
  imageUrl = "http://localhost:4000/api/products/images/";
  error: Error;
  cardType: string;

  constructor(
    private oredersService: OrdersService,
    private cartService: CartService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loginData = JSON.parse(localStorage.loginData);

    this.cartService.getActiveCart()
      .subscribe(
        data => {
          this.cartId = data.cartId
          this.error = undefined;
          this.getCartItems();
        },
        err => {
          this.error = err;
          this.cartId = undefined;
        }
      )
    this.createControllers();
    this.createForm();
  }

  getCartItems() {
    this.cartService.getAllCartItems(this.cartId)
      .subscribe(
        data => {
          this.cartItems = data;
          this.totalCartAmount = 0;
          this.cartItems.map(item => this.totalCartAmount += item.totalPrice)
          this.error = undefined;
        },
        err => {
          this.error = err;
          this.cartItems = undefined;
          this.totalCartAmount = undefined;
        }
      )
  }

  createControllers() {
    this.cityControl = new FormControl;
    this.streetControl = new FormControl("", [Validators.minLength(4), Validators.maxLength(30)]);
    this.shippingDateControl = new FormControl;
    this.creditCardControl = new FormControl("", Validators.pattern('^((([4-5])[0-9]{3})|((3)([0-9]{2}|[0-9]{3})))([0-9]{4}-?){3}$'))
  }

  createForm() {
    this.orderForm = new FormGroup({
      cityControl: this.cityControl,
      streetControl: this.streetControl,
      shippingDateControl: this.shippingDateControl,
      creditCardControl: this.creditCardControl,
    })
  }

  checkCreditCardType() {
    if(this.creditCardControl.value) {
    this.cardType = undefined;
    if (this.creditCardControl.value.toString().charAt(0) == 3 && this.creditCardControl.value.toString().length === 15) {
      this.cardType = "American Express";
    }
    else if (this.creditCardControl.value.toString().charAt(0) == 3 && this.creditCardControl.value.toString().length === 16) {
      this.cardType = "Diners";
    }
    else {
      switch (this.creditCardControl.value.toString().charAt(0)) {
        case "3":
          this.cardType = "American Express / Diners";
          break;
        case "4":
          this.cardType = "Visa";
          break;
        case "5":
          this.cardType = "Master Card";
          break;
        default: this.cardType = "Invalid card number";
          break;
      }
    }
  }
  }

  placeOrder() {
    this.last4CreditCard = this.creditCardControl.value.toString().substr(this.creditCardControl.value.toString().length - 4);

    this.newOrder = new Order(
      this.loginData.userId,
      this.cartId,
      this.totalCartAmount,
      this.cityControl.value,
      this.streetControl.value,
      this.shippingDateControl.value,
      this.formatDate(),
      this.last4CreditCard);

    this.oredersService.getAllOrdersByShippingDate()
      .subscribe(
        data => {
          this.error = undefined;
          this.ordersByShippingDate = data;
          const shippingDate = this.ordersByShippingDate.find(order => this.shippingDateControl.value == order.shippingDate);
          if (!shippingDate || shippingDate.numberOfOrders < 3) {
            this.sendOrder();
          }
          else {
            this.isDateAvailable = false;
          }
        },
        err => {
          if (err.status === 404) {
            this.sendOrder();
          }
          else {
            this.error = err;
          }
          this.ordersByShippingDate = undefined;
        })
  }

  sendOrder() {
    this.oredersService.placeNewOrder(this.newOrder)
      .subscribe(
        () => {
          this.openOrderCompleteDialog();
          this.deactivateCart();
        },
        err => {
          this.error = err;
        }
      )
  }

  deactivateCart() {
    this.cartService.deactivateCard(this.cartId)
      .subscribe(
        () => { },
        err => this.error = err
      )
  }

  setIsDateAvailableToTrue() {
    this.isDateAvailable = true;
  }

  formatDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = this.addZeroToDate(date.getMonth() + 1);
    const day = this.addZeroToDate(date.getDate());
    return `${year}-${month}-${day}`;
  }

  private addZeroToDate(num: number) {
    return num < 10 ? `0${num}` : num.toString();
  }

  formatTomorrowsDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = this.addZeroToDate(date.getMonth() + 1);
    const day = this.addZeroToDate(date.getDate() + 1);
    return `${year}-${month}-${day}`;
  }

  openOrderCompleteDialog() {
    this.dialog.open(this.callOrderCompleteDialog);
  }

  saveInvoice() {
    var data = `Invoice \n\nCustomer Name: ${this.loginData.fName} ${this.loginData.lName}\n\n`;
    this.cartItems.map(cI => data += `${cI.productName}: $${cI.totalPrice}\n`);
    data += `\nTotal paid: $${this.totalCartAmount.toFixed(2)} \nPaid by ${this.cardType} ${this.last4CreditCard}\n\nTHANK YOU!`;
    var file = new File([data], `invoice-${this.cartId}.txt`, { type: "text/plain;charset=utf-8" });
    saveAs(file);

  }

}

