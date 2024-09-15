import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductTypeUpateModel } from 'src/app/models/product-type/product-type-update-model';
import { ResponseModel } from 'src/app/models/response-model';
import { ProductTypeService } from 'src/app/services/product-type.service';

@Component({
  selector: 'app-product-type-update',
  templateUrl: './product-type-update.component.html',
  styleUrls: ['./product-type-update.component.scss']
})

export class ProductTypeUpdateComponent implements OnInit {

  // Product type update model
  productTypeUpdateModel: ProductTypeUpateModel = new ProductTypeUpateModel();
  private _productTypeId: number | undefined;

  constructor(private productTypeService: ProductTypeService, private toastrService: ToastrService, 
    private spinnerService: NgxSpinnerService, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    // Get product type id by url
    this.getProductTypeIdByUrl();

    // Get product type by id
    this.getProductTypeById();
  }

  // Get product type id
  private getProductTypeIdByUrl(): void {
    this.activatedRoute.params.subscribe(params => {
      this._productTypeId = +params["recordId"]; 
    });
  }

  // Get product type by id
  private getProductTypeById(): void {
    this.spinnerService.show();
    this.productTypeService.getByIdAsync(this._productTypeId!).subscribe((result: ResponseModel) => {
      this.productTypeUpdateModel = result.response;
      this.spinnerService.hide();
    },
    (error: any) => {
      this.spinnerService.hide();
      this.toastrService.error("প্রোডাক্ট টাইপ ডাটাবেস থেকে পাওয়া যাচ্ছেনা! আবার চেষ্টা করুণ।", "ত্রুটি");
    })
  }

  // On click product type update
  onClickProductTypeUpdate(): void {
    let isProductTypeFormValidate: boolean = this.isProductTypeFormValidate();

    if(isProductTypeFormValidate) {
      this.spinnerService.show();
      this.productTypeService.updateAsync(this.productTypeUpdateModel.id, this.productTypeUpdateModel).subscribe((result: ResponseModel) => {
        this.spinnerService.hide();
        this.toastrService.success("প্রোডাক্ট টাইপ এডিট হয়েছে।", "সফল");
        return this.router.navigate(["/product-types"]);
      },
      (error: any) => {
        this.spinnerService.hide();
        this.toastrService.error("প্রোডাক্ট টাইপ এডিট হয়নি! আবার চেষ্টা করুণ।", "ত্রুটি");
      })
    }  
  }

  // Product type form validation
  private isProductTypeFormValidate(): boolean {
    if(this.productTypeUpdateModel.name == undefined || this.productTypeUpdateModel.name == null 
      || this.productTypeUpdateModel.name == "") {
      this.toastrService.warning("প্লিজ, নাম দিন।", "সতর্কতা");
      return false;
    }
    else {
      return true;
    }
  }
}