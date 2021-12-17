import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ManagementComponent } from './management/management.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { NewUserLoginInfoComponent } from './new-user-login-info/new-user-login-info.component';
import { GreetingComponent } from './greeting/greeting.component';
import { OrderComponent } from './order/order.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    ProductsComponent,
    CartComponent,
    AddProductComponent,
    ManagementComponent,
    EditProductComponent,
    NewUserLoginInfoComponent,
    GreetingComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: "login", component: LoginComponent},
      {path: "new-user-login-info", component: NewUserLoginInfoComponent},
      {path: "register", component: RegisterComponent},
      {path: "main", component: MainComponent, children:[
        {path: "products/:categoryId", component: ProductsComponent},
        {path: "products/:categoryId/:productName", component: ProductsComponent},
      ]},
      {path: "management", component: ManagementComponent, children:[
        {path: "products/:categoryId", component: ProductsComponent},
        {path: "products/:categoryId/:productName", component: ProductsComponent},
      ]},
      {path: "order", component: OrderComponent},
      {path: "**", redirectTo: "login"}
    ]),
    NoopAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    FlexLayoutModule,
    MatDialogModule,
    MatIconModule,
    MatButtonToggleModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
