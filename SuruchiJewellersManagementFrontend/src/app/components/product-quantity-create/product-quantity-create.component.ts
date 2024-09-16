import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductQuantityCreateModel } from 'src/app/models/product-quantity/product-quantity-create-model';
import { ResponseModel } from 'src/app/models/response-model';
import { ProductQuantityService } from 'src/app/services/product-quantity.service';

@Component({
  selector: 'app-product-quantity-create',
  templateUrl: './product-quantity-create.component.html',
  styleUrls: ['./product-quantity-create.component.scss']
})

export class ProductQuantityCreateComponent implements OnInit {

  // Product quantity model
  productQuantityCreateModel: ProductQuantityCreateModel = new ProductQuantityCreateModel();

  constructor(private toastrService: ToastrService, private productQuantityService: ProductQuantityService, 
    private spinnerService: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
  }

  onClickProductQuantitySave(): void {
    let isProductQuantityFormValidate: boolean = this.isProductQuantityFormValidate();

    if(isProductQuantityFormValidate) {
      this.spinnerService.show();
      this.productQuantityService.createAsync(this.productQuantityCreateModel).subscribe((result: ResponseModel) => {
        this.spinnerService.hide();
        this.toastrService.success("প্রোডাক্ট কোয়ান্টিটি তৈরি হয়েছে।", "সফল");
        return this.router.navigate(["/product-quantities"]);
      },
      (error: any) => {
        this.spinnerService.hide();
        this.toastrService.error("প্রোডাক্ট কোয়ান্টিটি তৈরি হয় নাই! আবার চেষ্টা করুণ।", "ত্রুটি");
      })
    }    
  }

  // Product quantity form validation
  private isProductQuantityFormValidate(): boolean {
    if(this.productQuantityCreateModel.name == undefined || this.productQuantityCreateModel.name == null 
      || this.productQuantityCreateModel.name == "") {
      this.toastrService.warning("প্লিজ, নাম দিন।", "সতর্কতা");
      return false;
    }
    else {
      return true;
    }
  }
}