import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductUpateModel } from 'src/app/models/product/product-update-model';
import { ResponseModel } from 'src/app/models/response-model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})

export class ProductUpdateComponent implements OnInit {

  // Product update model
  productUpdateModel: ProductUpateModel = new ProductUpateModel();
  private _productTypeId: number | undefined;

  constructor(private productService: ProductService, private toastrService: ToastrService, 
    private spinnerService: NgxSpinnerService, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    // Get product id by url
    this.getProductIdByUrl();

    // Get product by id
    this.getProductById();
  }

  // Get product id
  private getProductIdByUrl(): void {
    this.activatedRoute.params.subscribe(params => {
      this._productTypeId = +params["recordId"]; 
    });
  }

  // Get product by id
  private getProductById(): void {
    this.spinnerService.show();
    this.productService.getByIdAsync(this._productTypeId!).subscribe((result: ResponseModel) => {
      this.productUpdateModel = result.response;
      this.spinnerService.hide();
    },
    (error: any) => {
      this.spinnerService.hide();
      this.toastrService.error("প্রোডাক্ট ডাটাবেস থেকে পাওয়া যাচ্ছেনা! আবার চেষ্টা করুণ।", "ত্রুটি");
    })
  }

  // On click product update
  onClickProductUpdate(): void {
    let isProductFormValidate: boolean = this.isProductFormValidate();

    if(isProductFormValidate) {
      this.spinnerService.show();
      this.productService.updateAsync(this.productUpdateModel.id, this.productUpdateModel).subscribe((result: ResponseModel) => {
        this.spinnerService.hide();
        this.toastrService.success("প্রোডাক্ট এডিট হয়েছে।", "সফল");
        return this.router.navigate(["/products"]);
      },
      (error: any) => {
        this.spinnerService.hide();
        this.toastrService.error("প্রোডাক্ট এডিট হয়নি! আবার চেষ্টা করুণ।", "ত্রুটি");
      })
    }  
  }

  // Product form validation
  private isProductFormValidate(): boolean {
    if(this.productUpdateModel.name == undefined || this.productUpdateModel.name == null 
      || this.productUpdateModel.name == "") {
      this.toastrService.warning("প্লিজ, নাম দিন।", "সতর্কতা");
      return false;
    }
    else {
      return true;
    }
  }
}