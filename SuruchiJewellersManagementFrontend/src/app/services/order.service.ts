import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response-model';
import { OrderCreateModel } from '../models/order/order-create-model';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  private appBaseUrl: string = "https://localhost:7001/api/";
  constructor(private httpClient: HttpClient) { }

  // Create order
  createAsync(createModel: OrderCreateModel): Observable<ResponseModel> {
    const createAsyncUrl: string = `${this.appBaseUrl}order/create`;
    let createOrder: Observable<ResponseModel> = this.httpClient.post<ResponseModel>(createAsyncUrl, createModel);

    return createOrder;
  }
}