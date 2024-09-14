import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CustomerCreateModel } from 'src/app/models/customer/customer-create-model';
import { ResponseModel } from 'src/app/models/response-model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})

export class CustomerCreateComponent implements OnInit {

  // Customer create model
  customerCreateModel: CustomerCreateModel = new CustomerCreateModel();

  constructor(private toastrService: ToastrService, private customerService: CustomerService, 
    private spinnerService: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
  }

  onClickCustomerSave(): void {
    let isCustomerFormValidate: boolean = this.isCustomerFormValidate();

    if(isCustomerFormValidate) {
      this.spinnerService.show();
      this.customerService.createAsync(this.customerCreateModel).subscribe((result: ResponseModel) => {
        this.spinnerService.hide();
        this.toastrService.success("কাস্টমার তৈরি হয়েছে।", "সফল");
        return this.router.navigate(["/customers"]);
      },
      (error: any) => {
        this.spinnerService.hide();
        this.toastrService.error("কাস্টমার তৈরি হয় নাই! আবার চেষ্টা করুণ।", "ত্রুটি");
      })
    }    
  }

  // Customer form validation
  private isCustomerFormValidate(): boolean {
    if(this.customerCreateModel.name == undefined || this.customerCreateModel.name == null 
      || this.customerCreateModel.name == "") {
      this.toastrService.warning("প্লিজ, নাম দিন।", "সতর্কতা");
      return false;
    }
    else if(this.customerCreateModel.nickName == undefined || this.customerCreateModel.nickName == null 
      || this.customerCreateModel.nickName == "") {
      this.toastrService.warning("ছোট নাম দিন।.", "সতর্কতা");
      return false;
    }
    else if(this.customerCreateModel.code == undefined || this.customerCreateModel.code == null 
      || this.customerCreateModel.code == "") {
      this.toastrService.warning("কোড দিন।", "সতর্কতা");
      return false;
    }
    else {
      return true;
    }
  }
}