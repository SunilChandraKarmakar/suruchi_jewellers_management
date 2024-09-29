import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerCreateComponent } from './components/customer-create/customer-create.component';
import { CustomerUpdateComponent } from './components/customer-update/customer-update.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HttpClientModule } from '@angular/common/http';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProductTypeListComponent } from './components/product-type-list/product-type-list.component';
import { ProductTypeCreateComponent } from './components/product-type-create/product-type-create.component';
import { ProductTypeUpdateComponent } from './components/product-type-update/product-type-update.component';
import { ProductQuantityListComponent } from './components/product-quantity-list/product-quantity-list.component';
import { ProductQuantityCreateComponent } from './components/product-quantity-create/product-quantity-create.component';
import { ProductQuantityUpdateComponent } from './components/product-quantity-update/product-quantity-update.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import { OrderCreateComponent } from './components/order-create/order-create.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { OrderUpdateComponent } from './components/order-update/order-update.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerCreateComponent,
    CustomerUpdateComponent,
    ProductTypeListComponent,
    ProductTypeCreateComponent,
    ProductTypeUpdateComponent,
    ProductQuantityListComponent,
    ProductQuantityCreateComponent,
    ProductQuantityUpdateComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
    OrderListComponent,
    OrderCreateComponent,
    OrderUpdateComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,

    // NZ Zorro modules
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzTableModule,
    NzDropDownModule,
    NzSelectModule
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }