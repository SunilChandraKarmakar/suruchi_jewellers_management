import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductViewModel } from 'src/app/models/product/product-view-model';
import { ResponseModel } from 'src/app/models/response-model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {

  // Product data source
  products: ProductViewModel[] = [];
  customProducts: ProductViewModel[] = [];

  // Table content search
  visible: boolean = false;
  searchValue: string = "";

  constructor(private productService: ProductService, private toastrService: ToastrService, 
    private spinnerService: NgxSpinnerService) { }

  ngOnInit() {

    // Get product
    this.getProducts();
  }

  // Get products
  private getProducts(): void {
    this.spinnerService.show();
    this.productService.getAllAsync().subscribe((result: ResponseModel) => {
      this.products = result.response;
      this.customProducts = result.response;
      this.spinnerService.hide();
    },
    (error: any) => {
      this.spinnerService.hide();
      this.toastrService.error("প্রোডাক্ট ডাটাবেস থেকে পাওয়া যাচ্ছেনা! আবার চেষ্টা করুণ।", "ত্রুটি");
    })
  }

  // Search by name
  search(): void {
    this.visible = false;
    this.customProducts = this.customProducts
      .filter((item: ProductViewModel) => item.name.indexOf(this.searchValue) !== -1);
  }

  reset(): void {
    this.searchValue = "";
    this.customProducts = this.products;
  }

  // Delete product
  onClickProductDelete(id: number): void {
    this.spinnerService.show();
    this.productService.deleteAsync(id).subscribe((result: ResponseModel) => {
      this.spinnerService.hide();
      this.toastrService.success("প্রোডাক্ট ডিলিট হয়েছে।", "সফল");
      return this.ngOnInit();
    },
    (error: any) => {
      this.spinnerService.hide();
      this.toastrService.error("প্রোডাক্ট ডিলিট হয়নি! আবার চেষ্টা করুণ।", "ত্রুটি");
    })
  }
}