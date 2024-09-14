import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CustomerUpdateModel } from 'src/app/models/customer/customer-update-model';
import { ResponseModel } from 'src/app/models/response-model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.scss']
})

export class CustomerUpdateComponent implements OnInit {

  // Customer model
  customerUpdateModel: CustomerUpdateModel = new CustomerUpdateModel();
  private _customerId: number | undefined;

  constructor(private customerService: CustomerService, private toastrService: ToastrService, 
    private spinnerService: NgxSpinnerService, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // Get customer id by url
    this.getCustomerIdByUrl();

    // Get customer by id
    this.getCustomerById();
  }

  // Get customer id
  private getCustomerIdByUrl(): void {
    this.activatedRoute.params.subscribe(params => {
      this._customerId = +params["recordId"]; 
    });
  }

  // Get customer by id
  private getCustomerById(): void {
    this.spinnerService.show();
    this.customerService.getByIdAsync(this._customerId!).subscribe((result: ResponseModel) => {
      this.customerUpdateModel = result.response;
      this.spinnerService.hide();
    },
    (error: any) => {
      this.spinnerService.hide();
      this.toastrService.error("কাস্টমার ডাটাবেস থেকে পাওয়া যাচ্ছেনা! আবার চেষ্টা করুণ।", "ত্রুটি");
    })
  }

  onClickCustomerUpdate(): void {
    let isCustomerFormValidate: boolean = this.isCustomerFormValidate();

    if(isCustomerFormValidate) {
      this.spinnerService.show();
      this.customerService.updateAsync(this.customerUpdateModel.id, this.customerUpdateModel).subscribe((result: ResponseModel) => {
        this.spinnerService.hide();
        this.toastrService.success("কাস্টমার এডিট হয়েছে।", "সফল");
        return this.router.navigate(["/customers"]);
      },
      (error: any) => {
        this.spinnerService.hide();
        this.toastrService.error("কাস্টমার এডিট হয়নি! আবার চেষ্টা করুণ।", "ত্রুটি");
      })
    }  
  }

  // Customer form validation
  private isCustomerFormValidate(): boolean {
    if(this.customerUpdateModel.name == undefined || this.customerUpdateModel.name == null 
      || this.customerUpdateModel.name == "") {
      this.toastrService.warning("প্লিজ, নাম দিন।", "সতর্কতা");
      return false;
    }
    else if(this.customerUpdateModel.nickName == undefined || this.customerUpdateModel.nickName == null 
      || this.customerUpdateModel.nickName == "") {
      this.toastrService.warning("ছোট নাম দিন।.", "সতর্কতা");
      return false;
    }
    else if(this.customerUpdateModel.code == undefined || this.customerUpdateModel.code == null 
      || this.customerUpdateModel.code == "") {
      this.toastrService.warning("কোড দিন।", "সতর্কতা");
      return false;
    }
    else {
      return true;
    }
  }
}