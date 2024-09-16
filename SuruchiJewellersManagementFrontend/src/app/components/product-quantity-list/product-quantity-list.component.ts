import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductQuantityViewModel } from 'src/app/models/product-quantity/product-quantity-view-model';
import { ResponseModel } from 'src/app/models/response-model';
import { ProductQuantityService } from 'src/app/services/product-quantity.service';

@Component({
  selector: 'app-product-quantity-list',
  templateUrl: './product-quantity-list.component.html',
  styleUrls: ['./product-quantity-list.component.scss']
})

export class ProductQuantityListComponent implements OnInit {

  // Product quantity data source
  productQuantities: ProductQuantityViewModel[] = [];
  customProductQuantity: ProductQuantityViewModel[] = [];

  // Table content search
  visible: boolean = false;
  searchValue: string = "";

  constructor(private productQuantityService: ProductQuantityService, private toastrService: ToastrService, 
    private spinnerService: NgxSpinnerService) { }

  ngOnInit() {

    // Get product quantities
    this.getProductQuantities();
  }

  // Get customers
  private getProductQuantities(): void {
    this.spinnerService.show();
    this.productQuantityService.getAllAsync().subscribe((result: ResponseModel) => {
      this.productQuantities = result.response;
      this.customProductQuantity = result.response;
      this.spinnerService.hide();
    },
    (error: any) => {
      this.spinnerService.hide();
      this.toastrService.error("প্রোডাক্ট কোয়ান্টিটি ডাটাবেস থেকে পাওয়া যাচ্ছেনা! আবার চেষ্টা করুণ।", "ত্রুটি");
    })
  }

  // Search by name
  search(): void {
    this.visible = false;
    this.customProductQuantity = this.customProductQuantity
      .filter((item: ProductQuantityViewModel) => item.name.indexOf(this.searchValue) !== -1);
  }

  reset(): void {
    this.searchValue = "";
    this.customProductQuantity = this.productQuantities;
  }

  // Delete product quantity
  onClickProductQuantityDelete(id: number): void {
    this.spinnerService.show();
    this.productQuantityService.deleteAsync(id).subscribe((result: ResponseModel) => {
      this.spinnerService.hide();
      this.toastrService.success("প্রোডাক্ট কোয়ান্টিটি ডিলিট হয়েছে।", "সফল");
      return this.ngOnInit();
    },
    (error: any) => {
      this.spinnerService.hide();
      this.toastrService.error("প্রোডাক্ট কোয়ান্টিটি ডিলিট হয়নি! আবার চেষ্টা করুণ।", "ত্রুটি");
    })
  }
}