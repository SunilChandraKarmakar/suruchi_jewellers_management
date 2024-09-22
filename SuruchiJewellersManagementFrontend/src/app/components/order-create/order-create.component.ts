import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CustomerViewMode } from 'src/app/models/customer/customer-view-model';
import { OrderDetailsCreateModel } from 'src/app/models/order-details/order-details-create-model';
import { OrderCreateModel } from 'src/app/models/order/order-create-model';
import { ProductTypeViewModel } from 'src/app/models/product-type/product-type-view-model';
import { ResponseModel } from 'src/app/models/response-model';
import { CustomerService } from 'src/app/services/customer.service';
import { ProductTypeService } from 'src/app/services/product-type.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})

export class OrderCreateComponent implements OnInit {

  // Order create model
  orderCreateModel: OrderCreateModel = new OrderCreateModel();

  // Customer view model
  customers: CustomerViewMode[] = [];

  // Product types view model
  productTypes: ProductTypeViewModel[] = [];

  // order details
  orderDetails: OrderDetailsCreateModel[] = [
    {productTypeId: 1, productId: 1, productQuantityId: 1, optional: undefined}
  ];

  constructor(private custmerService: CustomerService, private productTypeService: ProductTypeService,
    private toastrService: ToastrService, private spinerService: NgxSpinnerService) { }

  ngOnInit() {
    this.getCustomers();
    this.getProductTypes();
  }

  // Get all customers
  private getCustomers(): void {
    this.spinerService.show();
    this.custmerService.getAllAsync().subscribe((result: ResponseModel) => {
      this.customers = result.response;
      this.spinerService.hide();
    },
    (error: any) => {
      this.spinerService.hide();
      this.toastrService.error("কাস্টমার ডাটাবেস থেকে পাওয়া যাচ্ছেনা! আবার চেষ্টা করুণ।", "ত্রুটি")
    })
  }

  // Get all product types
  private getProductTypes(): void {
    this.spinerService.show();
    this.productTypeService.getAllAsync().subscribe((result: ResponseModel) => {
      this.productTypes = result.response;
      this.spinerService.hide();
    },
    (error: any) => {
      this.spinerService.hide();
      this.toastrService.error("প্রোডাক্ট টাইপ ডাটাবেস থেকে পাওয়া যাচ্ছেনা! আবার চেষ্টা করুণ।", "ত্রুটি")
    })
  }

  // Save order
  onClickOrderSave(): void {

  }
}