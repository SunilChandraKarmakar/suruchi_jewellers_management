import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CustomerViewMode } from 'src/app/models/customer/customer-view-model';
import { OrderDetailsCreateModel } from 'src/app/models/order-details/order-details-create-model';
import { OrderDetailsPrintModel } from 'src/app/models/order-print/order-details-print-model';
import { OrderPrintModel } from 'src/app/models/order-print/order-print-model';
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
import { BanglaNumberToWordService } from 'src/app/shared/bangla-number-to-word.service';
import { EnglishToBanglaNumberService } from 'src/app/shared/english-to-bangla-number.service';

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

  // Last created order number
  private _lastCreateOrderSerialNumber: number = 0;

  constructor(private custmerService: CustomerService, private productTypeService: ProductTypeService,
    private toastrService: ToastrService, private spinerService: NgxSpinnerService, 
    private productService: ProductService, private productQuantityService: ProductQuantityService,
    private orderService: OrderService, private banglaNumberToWordService: BanglaNumberToWordService, 
    private englishToBanglaNumberService: EnglishToBanglaNumberService) { }

  ngOnInit() {
    this.getCustomers();
    this.getProductTypes();
    this.getProducts();
    this.getProductQuantities();
    this.getLastOrderSerialNumber();
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

  // Get last order serial number
  private getLastOrderSerialNumber(): void {
    this.spinerService.show();
    this.orderService.getAllAsync().subscribe((result: ResponseModel) => {
      this._lastCreateOrderSerialNumber = result.response.length + 1;
      this.spinerService.hide();
    },
    (error: any) => {
      this.spinerService.hide();
      this.toastrService.error("Order seril number cannot find! Please, try again.", "Error");
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
    // Check order from validation
    let isOrderFromValidated: boolean = this.orderFromValidation();

    if(isOrderFromValidated) {
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

  onClickPrintOrder(): void {
    // Prepired print model
    let orderPrint: OrderPrintModel = new OrderPrintModel();
    orderPrint.serialNumber = this.englishToBanglaNumberService.convertToBanglaNumber(this._lastCreateOrderSerialNumber);
    orderPrint.date = this.orderCreateModel.date;
    orderPrint.customerName = this.customerName!;
    orderPrint.orderNumber = this.orderCreateModel.orderNumber!;
    orderPrint.productOptionName = this.getProdutOptionName(this.orderCreateModel.productOptionId!)!;
    orderPrint.vori = this.orderCreateModel.vori!;
    orderPrint.ana = this.orderCreateModel.ana!;
    orderPrint.roti = this.orderCreateModel.roti!;
    orderPrint.amount = this.orderCreateModel.amount!;
    orderPrint.amountInWord = this.banglaNumberToWordService.convertBanglaNumberToWord(this.orderCreateModel.amount!);
    
    this.orderCreateModel.orderDetailsCreateModels.forEach(orderDetailsModel => {
      let orderDetailsPrintModel: OrderDetailsPrintModel = new OrderDetailsPrintModel();
      orderDetailsPrintModel.productTypeId = orderDetailsModel.productTypeId;
      orderDetailsPrintModel.productTypeName = this.getProdutTypeName(orderDetailsModel.productTypeId)!;
      orderDetailsPrintModel.productName = this.getProdutName(orderDetailsModel.productId)!;
      orderDetailsPrintModel.productQuantityName = this.getProdutQuantityName(orderDetailsModel.productQuantityId)!;
      orderDetailsPrintModel.optional = orderDetailsModel.optional!;

      orderPrint.orderDetailsPrintModel.push(orderDetailsPrintModel);
    });

    // Set print data for pass another component
    const newWindow = window.open("print-order", '_blank')!;

    newWindow.onload = () => {
      newWindow.postMessage(orderPrint, '*');
    }
  }

  // Order from validation
  orderFromValidation(): boolean {
    if(this.orderCreateModel.date == undefined || this.orderCreateModel.date == null || this.orderCreateModel.date == "") {
      this.toastrService.warning("তারিখ দিন।", "সতর্কতা");
      return false;
    }
    else if(this.orderCreateModel.customerId == undefined || this.orderCreateModel.customerId == null) {
      this.toastrService.warning("কাস্টমারের নাম সিলেক্ট করুন।", "সতর্কতা");
      return false;
    }
    else if(this.orderCreateModel.orderNumber == undefined || this.orderCreateModel.orderNumber == null 
      || this.orderCreateModel.orderNumber == "") {
      this.toastrService.warning("অর্ডার নাম্বার দিন।", "সতর্কতা");
      return false;
    }
    else if(this.orderCreateModel.orderDetailsCreateModels == undefined 
      || this.orderCreateModel.orderDetailsCreateModels == null || this.orderCreateModel.orderDetailsCreateModels.length <= 0) {
      this.toastrService.warning("প্রোডাক্ট সিলেক্ট করুন।", "সতর্কতা");
      return false;
    }
    else if(this.orderCreateModel.amount == undefined || this.orderCreateModel.amount == null || this.orderCreateModel.amount) {
      this.toastrService.warning("টাকার পরিমান দিন।", "সতর্কতা");
      return false;
    }
    else {
      return true;
    }
  }
}