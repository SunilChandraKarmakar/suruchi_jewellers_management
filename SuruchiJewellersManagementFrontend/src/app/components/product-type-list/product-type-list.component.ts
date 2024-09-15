import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductTypeViewModel } from 'src/app/models/product-type/product-type-view-model';
import { ResponseModel } from 'src/app/models/response-model';
import { ProductTypeService } from 'src/app/services/product-type.service';

@Component({
  selector: 'app-product-type-list',
  templateUrl: './product-type-list.component.html',
  styleUrls: ['./product-type-list.component.scss']
})

export class ProductTypeListComponent implements OnInit {

  // Product type data source
  productTypes: ProductTypeViewModel[] = [];
  customProductTypes: ProductTypeViewModel[] = [];

  // Table content search
  visible: boolean = false;
  searchValue: string = "";

  constructor(private productTypeService: ProductTypeService, private toastrService: ToastrService, 
    private spinnerService: NgxSpinnerService) { }

  ngOnInit() {

    // Get product types
    this.getProductTypes();
  }

  // Get customers
  private getProductTypes(): void {
    this.spinnerService.show();
    this.productTypeService.getAllAsync().subscribe((result: ResponseModel) => {
      this.productTypes = result.response;
      this.customProductTypes = result.response;
      this.spinnerService.hide();
    },
    (error: any) => {
      this.spinnerService.hide();
      this.toastrService.error("প্রোডাক্ট টাইপ ডাটাবেস থেকে পাওয়া যাচ্ছেনা! আবার চেষ্টা করুণ।", "ত্রুটি");
    })
  }

  // Search by name
  search(): void {
    this.visible = false;
    this.customProductTypes = this.customProductTypes
      .filter((item: ProductTypeViewModel) => item.name.indexOf(this.searchValue) !== -1);
  }

  reset(): void {
    this.searchValue = "";
    this.customProductTypes = this.productTypes;
  }

  // Delete product type
  onClickProductTypeDelete(id: number): void {
    this.spinnerService.show();
    this.productTypeService.deleteAsync(id).subscribe((result: ResponseModel) => {
      this.spinnerService.hide();
      this.toastrService.success("প্রোডাক্ট টাইপ ডিলিট হয়েছে।", "সফল");
      return this.ngOnInit();
    },
    (error: any) => {
      this.spinnerService.hide();
      this.toastrService.error("প্রোডাক্ট টাইপ ডিলিট হয়নি! আবার চেষ্টা করুণ।", "ত্রুটি");
    })
  }
}