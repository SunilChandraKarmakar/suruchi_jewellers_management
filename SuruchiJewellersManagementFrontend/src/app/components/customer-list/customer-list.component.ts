import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CustomerViewMode } from 'src/app/models/customer/customer-view-model';
import { ResponseModel } from 'src/app/models/response-model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  providers: [CustomerService]
})

export class CustomerListComponent implements OnInit {

  // Customer data source
  customers: CustomerViewMode[] = [];
  customCustomers: CustomerViewMode[] = [];

  // Table content search
  visible: boolean = false;
  searchValue: string = "";

  constructor(private customerService: CustomerService, private toastrService: ToastrService, 
    private spinnerService: NgxSpinnerService) { }

  ngOnInit() {

    // Get customers
    this.getCustomers();
  }

  // Get customers
  private getCustomers(): void {
    this.spinnerService.show();
    this.customerService.getAllAsync().subscribe((result: ResponseModel) => {
      this.customers = result.response;
      this.customCustomers = result.response;
      this.spinnerService.hide();
    },
    (error: any) => {
      this.spinnerService.hide();
      this.toastrService.error("কাস্টমার ডাটাবেস থেকে পাওয়া যাচ্ছেনা! আবার চেষ্টা করুণ।", "ত্রুটি");
    })
  }

  // Search by name
  search(): void {
    this.visible = false;
    this.customCustomers = this.customCustomers.filter((item: CustomerViewMode) => item.name.indexOf(this.searchValue) !== -1);
  }

  reset(): void {
    this.searchValue = "";
    this.customCustomers = this.customers;
  }

  // Delete customer
  onClickCustomerDelete(id: number): void {
    this.spinnerService.show();
    this.customerService.deleteAsync(id).subscribe((result: ResponseModel) => {
      this.spinnerService.hide();
      this.toastrService.success("কাস্টমার ডিলিট হয়েছে।", "সফল");
      return this.ngOnInit();
    },
    (error: any) => {
      this.spinnerService.hide();
      this.toastrService.error("কাস্টমার ডিলিট হয়নি! আবার চেষ্টা করুণ।", "ত্রুটি");
    })
  }
}