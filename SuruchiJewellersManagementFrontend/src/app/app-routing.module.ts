import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerCreateComponent } from './components/customer-create/customer-create.component';
import { CustomerUpdateComponent } from './components/customer-update/customer-update.component';
import { ProductTypeListComponent } from './components/product-type-list/product-type-list.component';
import { ProductTypeCreateComponent } from './components/product-type-create/product-type-create.component';
import { ProductTypeUpdateComponent } from './components/product-type-update/product-type-update.component';

const routes: Routes = [
  // For not match url
  // { path: "*", component: CustomerListComponent, pathMatch: "full" }, 

  // For customer
  { path: "", component: CustomerListComponent, pathMatch: "full" },
  { path: "customers", component: CustomerListComponent, pathMatch: "full" },
  { path: "customer-create", component: CustomerCreateComponent, pathMatch: "full" },
  { path: "customer-update/:recordId", component: CustomerUpdateComponent, pathMatch: "full" },

  // For product type
  { path: "", component: ProductTypeListComponent, pathMatch: "full" },
  { path: "product-types", component: ProductTypeListComponent, pathMatch: "full" },
  { path: "product-type-create", component: ProductTypeCreateComponent, pathMatch: "full" },
  { path: "product-type-update/:recordId", component: ProductTypeUpdateComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }