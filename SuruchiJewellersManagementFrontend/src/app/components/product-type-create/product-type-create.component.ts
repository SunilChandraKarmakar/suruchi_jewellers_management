import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductTypeCreateModel } from 'src/app/models/product-type/product-type-create-model';
import { ResponseModel } from 'src/app/models/response-model';
import { ProductTypeService } from 'src/app/services/product-type.service';

@Component({
  selector: 'app-product-type-create',
  templateUrl: './product-type-create.component.html',
  styleUrls: ['./product-type-create.component.scss']
})

export class ProductTypeCreateComponent implements OnInit {

  // Product type model
  productTypeCreateModel: ProductTypeCreateModel = new ProductTypeCreateModel();

  constructor(private toastrService: ToastrService, private productTypeService: ProductTypeService, 
    private spinnerService: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
  }

  onClickProductTypeSave(): void {
    let isProductTypeFormValidate: boolean = this.isProductTypeFormValidate();

    if(isProductTypeFormValidate) {
      this.spinnerService.show();
      this.productTypeService.createAsync(this.productTypeCreateModel).subscribe((result: ResponseModel) => {
        this.spinnerService.hide();
        this.toastrService.success("প্রোডাক্ট টাইপ তৈরি হয়েছে।", "সফল");
        return this.router.navigate(["/product-types"]);
      },
      (error: any) => {
        this.spinnerService.hide();
        this.toastrService.error("প্রোডাক্ট টাইপ তৈরি হয় নাই! আবার চেষ্টা করুণ।", "ত্রুটি");
      })
    }    
  }

  // Product type form validation
  private isProductTypeFormValidate(): boolean {
    if(this.productTypeCreateModel.name == undefined || this.productTypeCreateModel.name == null 
      || this.productTypeCreateModel.name == "") {
      this.toastrService.warning("প্লিজ, নাম দিন।", "সতর্কতা");
      return false;
    }
    else {
      return true;
    }
  }
}