import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductCreateModel } from 'src/app/models/product/product-create-model';
import { ResponseModel } from 'src/app/models/response-model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})

export class ProductCreateComponent implements OnInit {

  // Product model
  productCreateModel: ProductCreateModel = new ProductCreateModel();

  constructor(private toastrService: ToastrService, private productService: ProductService, 
    private spinnerService: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
  }

  onClickProductSave(): void {
    let isProductFormValidate: boolean = this.isProductFormValidate();

    if(isProductFormValidate) {
      this.spinnerService.show();
      this.productService.createAsync(this.productCreateModel).subscribe((result: ResponseModel) => {
        this.spinnerService.hide();
        this.toastrService.success("প্রোডাক্ট তৈরি হয়েছে।", "সফল");
        return this.router.navigate(["/products"]);
      },
      (error: any) => {
        this.spinnerService.hide();
        this.toastrService.error("প্রোডাক্ট তৈরি হয় নাই! আবার চেষ্টা করুণ।", "ত্রুটি");
      })
    }    
  }

  // Product form validation
  private isProductFormValidate(): boolean {
    if(this.productCreateModel.name == undefined || this.productCreateModel.name == null 
      || this.productCreateModel.name == "") {
      this.toastrService.warning("প্লিজ, নাম দিন।", "সতর্কতা");
      return false;
    }
    else {
      return true;
    }
  }
}