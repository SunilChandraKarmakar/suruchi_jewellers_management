import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OrderViewModel } from 'src/app/models/order/order-view-model';
import { ResponseModel } from 'src/app/models/response-model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})

export class OrderListComponent implements OnInit {

  // Order data source
  orders: OrderViewModel[] = [];
  customOrders: OrderViewModel[] = [];

  // Table content search
  visible: boolean = false;
  searchValue: string = "";
  index: number = -1;
  isExpand = false;

  constructor(private orderService: OrderService, private toastrService: ToastrService, 
    private spinnerService: NgxSpinnerService) { }

  ngOnInit() {

    // Get orders
    this.getOrders();
  }

  // Get orders
  private getOrders(): void {
    this.spinnerService.show();
    this.orderService.getAllAsync().subscribe((result: ResponseModel) => {
      this.orders = result.response;
      this.customOrders = result.response;
      this.spinnerService.hide();
    },
    (error: any) => {
      this.spinnerService.hide();
      this.toastrService.error("অর্ডার ডাটাবেস থেকে পাওয়া যাচ্ছেনা! আবার চেষ্টা করুণ।", "ত্রুটি");
    })
  }

  // Search by name
  search(): void {
    this.visible = false;
    this.customOrders = this.customOrders
      .filter((item: OrderViewModel) => item.customerName.indexOf(this.searchValue) !== -1);
  }

  reset(): void {
    this.searchValue = "";
    this.customOrders = this.orders;
  }

  // Delete order
  onClickProductDelete(id: number): void {
    this.spinnerService.show();
    this.orderService.deleteAsync(id).subscribe((result: ResponseModel) => {
      this.spinnerService.hide();
      this.toastrService.success("অর্ডার ডিলিট হয়েছে।", "সফল");
      return this.ngOnInit();
    },
    (error: any) => {
      this.spinnerService.hide();
      this.toastrService.error("অর্ডার ডিলিট হয়নি! আবার চেষ্টা করুণ।", "ত্রুটি");
    })
  }

  Open(index: any): void {
    this.index = index;
    this.isExpand = true;
  }

  Close(): void {
    this.index = -1;
    this.isExpand = false;
  }
}