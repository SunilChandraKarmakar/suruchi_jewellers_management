import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerCreateComponent } from './components/customer-create/customer-create.component';
import { CustomerUpdateComponent } from './components/customer-update/customer-update.component';

const routes: Routes = [
  // For not match url
  // { path: "*", component: CustomerListComponent, pathMatch: "full" }, 

  // For customer
  { path: "", component: CustomerListComponent, pathMatch: "full" },
  { path: "customers", component: CustomerListComponent, pathMatch: "full" },
  { path: "customer-create", component: CustomerCreateComponent, pathMatch: "full" },
  { path: "customer-update/:recordId", component: CustomerUpdateComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }