import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerCreateComponent } from './components/customer-create/customer-create.component';
import { CustomerUpdateComponent } from './components/customer-update/customer-update.component';
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
import { OrderUpdateComponent } from './components/order-update/order-update.component';

const routes: Routes = [
  // For not match url
  { path: "*", component: CustomerListComponent, pathMatch: "full" }, 

  // For customer
  { path: "customers", component: CustomerListComponent, pathMatch: "full" },
  { path: "customer-create", component: CustomerCreateComponent, pathMatch: "full" },
  { path: "customer-update/:recordId", component: CustomerUpdateComponent, pathMatch: "full" },

  // For product type
  { path: "product-types", component: ProductTypeListComponent, pathMatch: "full" },
  { path: "product-type-create", component: ProductTypeCreateComponent, pathMatch: "full" },
  { path: "product-type-update/:recordId", component: ProductTypeUpdateComponent, pathMatch: "full" },

  // For product quantity
  { path: "product-quantities", component: ProductQuantityListComponent, pathMatch: "full" },
  { path: "product-quantity-create", component: ProductQuantityCreateComponent, pathMatch: "full" },
  { path: "product-quantity-update/:recordId", component: ProductQuantityUpdateComponent, pathMatch: "full" },

  // For product
  { path: "products", component: ProductListComponent, pathMatch: "full" },
  { path: "product-create", component: ProductCreateComponent, pathMatch: "full" },
  { path: "product-update/:recordId", component: ProductUpdateComponent, pathMatch: "full" },

  // For order
  { path: "orders", component: OrderListComponent, pathMatch: "full" },
  { path: "order-create", component: OrderCreateComponent, pathMatch: "full" },
  { path: "order-update/:recordId", component: OrderUpdateComponent, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }