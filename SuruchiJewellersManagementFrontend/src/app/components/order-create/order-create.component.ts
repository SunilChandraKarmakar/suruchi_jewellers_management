import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CustomerViewMode } from 'src/app/models/customer/customer-view-model';
import { OrderDetailsCreateModel } from 'src/app/models/order-details/order-details-create-model';
import { OrderCreateModel } from 'src/app/models/order/order-create-model';
import { ProductOptionViewModel } from 'src/app/models/product-option/product-option-view-model';
import { ProductQuantityViewModel } from 'src/app/models/product-quantity/product-quantity-view-model';
import { ProductTypeViewModel } from 'src/app/models/product-type/product-type-view-model';
import { ProductViewModel } from 'src/app/models/product/product-view-model';
import { ResponseModel } from 'src/app/models/response-model';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductQuantityService } from 'src/app/services/product-quantity.service';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { ProductService } from 'src/app/services/product.service';

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

  // Product view model
  products: ProductViewModel[] = [];

  // Product quantities view model
  productQuantities: ProductQuantityViewModel[] = [];

  // Product options view model
  productOptions: ProductOptionViewModel[] = [
    { id: 1, name: "আনুমানিক" },
    { id: 2, name: "পাথরসহ" }
  ];

  // Print property
  customerName: string | undefined;
  productTypeName: string | undefined;

  @ViewChild('printSection', { static: false }) printSection!: ElementRef;

  constructor(private custmerService: CustomerService, private productTypeService: ProductTypeService,
    private toastrService: ToastrService, private spinerService: NgxSpinnerService, 
    private productService: ProductService, private productQuantityService: ProductQuantityService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.getCustomers();
    this.getProductTypes();
    this.getProducts();
    this.getProductQuantities();
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

  // Get all products
  private getProducts(): void {
    this.spinerService.show();
    this.productService.getAllAsync().subscribe((result: ResponseModel) => {
      this.products = result.response;
      this.spinerService.hide();
    },
    (error: any) => {
      this.spinerService.hide();
      this.toastrService.error("প্রোডাক্ট ডাটাবেস থেকে পাওয়া যাচ্ছেনা! আবার চেষ্টা করুণ।", "ত্রুটি")
    })
  }

  // Get all product quantities
  private getProductQuantities(): void {
    this.spinerService.show();
    this.productQuantityService.getAllAsync().subscribe((result: ResponseModel) => {
      this.productQuantities = result.response;
      this.spinerService.hide();
    },
    (error: any) => {
      this.spinerService.hide();
      this.toastrService.error("প্রোডাক্ট কোয়ান্টিটি ডাটাবেস থেকে পাওয়া যাচ্ছেনা! আবার চেষ্টা করুণ।", "ত্রুটি")
    })
  }

  // Add order item
  onClickAddOrderItem(): void {

    // Create a empty order details create models object
    let emptyOrderdetails: OrderDetailsCreateModel = new OrderDetailsCreateModel();
    this.orderCreateModel.orderDetailsCreateModels.push(emptyOrderdetails);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  onDeleteOrderItem(index: number): void {
    this.orderCreateModel.orderDetailsCreateModels.splice(index, 1);
  }

  // Save order
  onClickOrderSave(): void {
    this.spinerService.show();

    this.orderService.createAsync(this.orderCreateModel).subscribe((result: ResponseModel) => {
      this.spinerService.hide();
      this.toastrService.success("অর্ডার তৈরি হয়েছে।", "সফল");
      this.orderCreateModel = new OrderCreateModel();
    },
    (error: any) => {
      this.spinerService.hide();
      this.toastrService.error("অর্ডার তৈরি হয় নাই! আবার চেষ্টা করুণ।", "ত্রুটি");
    })
  }

  // On change customer id
  onChangeCustomerId(customerId: number): void {
    this.customerName = this.customers.find(c => c.id == customerId)?.name;
  }

  // Get prduct type name
  getProdutTypeName(productTypeId: number): string | undefined {
    return this.productTypes.find(pt => pt.id == productTypeId)?.name ;
  }

  // Get product name
  getProdutName(productId: number): string | undefined {
    return this.products.find(p => p.id == productId)?.name;
  }

  // Get product quantity name
  getProdutQuantityName(produtQuantityId: number): string | undefined {
    return this.productQuantities.find(pq => pq.id == produtQuantityId)?.name;
  }

  // Get product option name
  getProdutOptionName(productOptionId: number): string | undefined {
    return this.productOptions.find(po => po.id == productOptionId)?.name;
  }

  // On click print
  onClickPrint(): void {
    // Invoke the print dialog
    window.print();
  }
}