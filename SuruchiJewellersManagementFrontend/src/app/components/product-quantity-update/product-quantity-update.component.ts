import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductQuantityUpdateModel } from 'src/app/models/product-quantity/product-quantity-update-model';
import { ResponseModel } from 'src/app/models/response-model';
import { ProductQuantityService } from 'src/app/services/product-quantity.service';

@Component({
  selector: 'app-product-quantity-update',
  templateUrl: './product-quantity-update.component.html',
  styleUrls: ['./product-quantity-update.component.scss']
})

export class ProductQuantityUpdateComponent implements OnInit {

  // Product quantity update model
  productQuantityUpdateModel: ProductQuantityUpdateModel = new ProductQuantityUpdateModel();
  private _productTypeId: number | undefined;

  constructor(private productQuantityService: ProductQuantityService, private toastrService: ToastrService, 
    private spinnerService: NgxSpinnerService, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    // Get product quantity id by url
    this.getProductQuantityIdByUrl();

    // Get product quantity by id
    this.getProductQuantityById();
  }

  // Get product quantity id
  private getProductQuantityIdByUrl(): void {
    this.activatedRoute.params.subscribe(params => {
      this._productTypeId = +params["recordId"]; 
    });
  }

  // Get product quantity by id
  private getProductQuantityById(): void {
    this.spinnerService.show();
    this.productQuantityService.getByIdAsync(this._productTypeId!).subscribe((result: ResponseModel) => {
      this.productQuantityUpdateModel = result.response;
      this.spinnerService.hide();
    },
    (error: any) => {
      this.spinnerService.hide();
      this.toastrService.error("প্রোডাক্ট কোয়ান্টিটি ডাটাবেস থেকে পাওয়া যাচ্ছেনা! আবার চেষ্টা করুণ।", "ত্রুটি");
    })
  }

  // On click product quantity update
  onClickProductQuantityUpdate(): void {
    let isProductQuantityFormValidate: boolean = this.isProductQuantityFormValidate();

    if(isProductQuantityFormValidate) {
      this.spinnerService.show();
      this.productQuantityService.updateAsync(this.productQuantityUpdateModel.id, this.productQuantityUpdateModel).subscribe((result: ResponseModel) => {
        this.spinnerService.hide();
        this.toastrService.success("প্রোডাক্ট কোয়ান্টিটি এডিট হয়েছে।", "সফল");
        return this.router.navigate(["/product-quantities"]);
      },
      (error: any) => {
        this.spinnerService.hide();
        this.toastrService.error("প্রোডাক্ট কোয়ান্টিটি এডিট হয়নি! আবার চেষ্টা করুণ।", "ত্রুটি");
      })
    }  
  }

  // Product quantity form validation
  private isProductQuantityFormValidate(): boolean {
    if(this.productQuantityUpdateModel.name == undefined || this.productQuantityUpdateModel.name == null 
      || this.productQuantityUpdateModel.name == "") {
      this.toastrService.warning("প্লিজ, নাম দিন।", "সতর্কতা");
      return false;
    }
    else {
      return true;
    }
  }
}